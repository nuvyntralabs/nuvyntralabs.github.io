---
title: "Lock the Device, Not the Page: App Lock, Biometric, Screen Guard, and the Vault"
published: false
description: "Five MAUI plugins, five jobs: AppLock 1.0.7 owns the background timer and cover, BiometricPlus 1.0.1 is one prompt, ScreenGuard 1.0.1 blanks Android recents, SecureStoragePlus 1.0.8 holds expiring secrets, FileVault 1.0.8 encrypts files."
tags: dotnet, maui, security, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A banking screen that hides itself with `IsVisible` is still in the recents thumbnail. A Face ID call on one button does not lock the app two minutes after the user switches to Messages. A token in `Preferences` is not a file in a vault.

Each of those is a different package. This post wires the five that cover the device: the lock timer, a one-shot prompt, the screenshot flag, small secrets, and encrypted files.

| Job | Package | Version |
| --- | --- | --- |
| Background, timer, cover, unlock | [`Plugin.Maui.AppLock`](https://www.nuget.org/packages/Plugin.Maui.AppLock) | 1.0.7 |
| One Face ID, fingerprint, or device PIN prompt | [`Plugin.Maui.BiometricPlus`](https://www.nuget.org/packages/Plugin.Maui.BiometricPlus) | 1.0.1 |
| Recents thumbnail and screenshots | [`Plugin.Maui.ScreenGuard`](https://www.nuget.org/packages/Plugin.Maui.ScreenGuard) | 1.0.1 |
| A short secret with expiry | [`Plugin.Maui.SecureStoragePlus`](https://www.nuget.org/packages/Plugin.Maui.SecureStoragePlus) | 1.0.8 |
| An encrypted file | [`Plugin.Maui.FileVault`](https://www.nuget.org/packages/Plugin.Maui.FileVault) | 1.0.8 |

All five are MIT licensed. AppLock, BiometricPlus, ScreenGuard, and FileVault target Android and iOS. SecureStoragePlus also targets Mac Catalyst and Windows. Access and refresh tokens, 401 refresh, and multi-device revoke stay on [Plugin.Maui.SecureSession](https://nuvyntralabs.github.io/packages/plugin-maui-secure-session/). SecureSession persists through SecureStoragePlus. It is not a second lock timer.

## The timer and the cover

AppLock owns the sequence: the app backgrounds, `LockAfter` elapses, the app returns, the user authenticates, the app unlocks. Face ID and the device PIN are the unlock step.

```bash
dotnet add package Plugin.Maui.AppLock --version 1.0.7
```

```csharp
using Plugin.Maui.AppLock;

builder
    .UseMauiApp<App>()
    .UseAppLock(options =>
    {
        options.LockAfter = TimeSpan.FromMinutes(2);
        options.AllowBiometric = true;
        options.AllowDevicePin = true;
        options.AutoPromptOnResume = true;
    });
```

`TimeSpan.Zero` locks as soon as the app backgrounds. `LockOnStart = true` also starts locked after a cold start. `UseAppLock` hooks Android pause/resume and iOS background/activate. Without the generic host, call `NotifyBackground()` and `NotifyForeground()` yourself.

Swap the window to a cover while the app is locked:

```csharp
appLock.StateChanged += (_, e) =>
{
    window.Page = e.Current is AppLockState.Locked or AppLockState.Authenticating
        ? new AppLockPage(appLock)
        : mainPage;
};
```

`RequireAuthenticationAsync()` is the gate before the app is usable. A balance screen that must prompt even when the timer has not elapsed uses `AppLockPromptMode.Always`:

```csharp
var result = await AppLock.RequireAuthenticationAsync(AppLockPromptMode.Always);
if (!result.Succeeded)
    return;

ShowBalance();
```

A failed or cancelled prompt returns `AppLockAuthResult` and leaves the app locked. It does not throw. If the automatic resume prompt throws, `AuthenticationCompleted` still fires with a failed result so the cover stays up.

Android API 23+. `USE_BIOMETRIC` is merged from the package. Enroll a fingerprint, face, or device PIN before you test. When `AllowDevicePin` is true, the system prompt includes the device credential. iOS needs `NSFaceIDUsageDescription` when biometrics are allowed. `AllowDevicePin` uses `LAPolicy.DeviceOwnerAuthentication`.

`samples/Plugin.Maui.AppLock.Sample` is a small vault: enable the lock, change the grace period, lock now, and step up on "View balance".

## One prompt, without a timer

BiometricPlus answers a single question: is this the enrolled user, right now? The NuGet id is `Plugin.Maui.BiometricPlus` because nuget.org already reserved `Plugin.Maui.Biometric`. The namespace stays `Plugin.Maui.Biometric`.

```bash
dotnet add package Plugin.Maui.BiometricPlus --version 1.0.1
```

```csharp
using Plugin.Maui.Biometric;

builder.UseBiometric(o =>
{
    o.AllowDeviceCredential = true;
    o.DefaultReason = "Unlock";
});

var availability = await Biometric.Current.GetAvailabilityAsync();
var result = await Biometric.Current.AuthenticateAsync(
    new BiometricRequest { Reason = "Unlock payroll" });
```

`GetAvailabilityAsync` returns `Available`, `NotEnrolled`, or `NotSupported`. Android uses AndroidX `BiometricPrompt` (API 23+). Declare `USE_BIOMETRIC` and `USE_FINGERPRINT` on the host. iOS uses `LAContext`. Face ID needs `NSFaceIDUsageDescription`. Touch ID and the device passcode do not.

Use this package for a button. Use AppLock when the whole window has to disappear after background.

## The recents thumbnail

ScreenGuard is the window flag. It is not the lock, and it is not file encryption.

```bash
dotnet add package Plugin.Maui.ScreenGuard --version 1.0.1
```

```csharp
using Plugin.Maui.ScreenGuard;

builder.UseScreenGuard(o => o.ProtectOnStart = false);

ScreenGuard.SetProtected(balancePage, true);
```

`Protect` and `Unprotect` are reference-counted. `SetProtected(page, true)` ties a hold to one page. Android sets `FLAG_SECURE`: the recents thumbnail is blank, and screenshots are blocked. No extra manifest permission.

iOS cannot block a screenshot. The plugin raises `CaptureStateChanged` and exposes `IsCaptured` while the screen is recorded. The host supplies the overlay. Treat an iOS "blocked screenshot" as a bug in the write-up, not a feature of this package.

## The short secret

SecureStoragePlus sits on MAUI `SecureStorage` (Keychain, EncryptedSharedPreferences) and adds an AES-256-GCM envelope. The key name is associated data, so a blob cannot be copied under another name. Values can expire. The ciphertext is what gets stored.

```bash
dotnet add package Plugin.Maui.SecureStoragePlus --version 1.0.8
```

```csharp
builder.UseSecureStoragePlus();

await SecureStoragePlus.Default.SetAsync(
    "session",
    sessionJson,
    SecureStorageOptions.ExpireIn(TimeSpan.FromHours(8)));

var result = await SecureStoragePlus.Default.TryGetAsync("session");
if (result.Expired)
{
    // sign in again
}
```

`GetAsync` on an expired key returns null and removes the value. Strings are stored as-is. Other types are JSON:

```csharp
await SecureStoragePlus.Default.SetAsync("profile", new UserProfile("Ada", 36));
var profile = await SecureStoragePlus.Default.GetAsync<UserProfile>("profile");
```

After an upgrade, copy named keys out of MAUI `SecureStorage` once:

```csharp
await SecureStoragePlus.Default.MigrateFromMauiSecureStorageAsync(
    ["oauth_token", "refresh_token"],
    new MigrationOptions
    {
        RemoveSource = true,
        OverwriteExisting = false,
        StorageOptions = SecureStorageOptions.ExpireIn(TimeSpan.FromDays(14))
    });
```

On iOS, add a keychain access group for `$(AppIdentifierPrefix)$(CFBundleIdentifier)` so values survive the way you expect. On Android, if Auto Backup restores preferences onto a device that does not have the original key, catch the failed read and call `RemoveAllAsync(resetEncryptionKey: true)`.

A secret that is a file, not a string, belongs in FileVault.

## The file

FileVault stores app-private files as AES-256-GCM ciphertext. The master key lives in the platform secure store. Each file has its own nonce.

```bash
dotnet add package Plugin.Maui.FileVault --version 1.0.8
```

```csharp
using Plugin.Maui.FileVault;

builder.UseFileVault(options =>
{
    options.DefaultTimeToLive = TimeSpan.FromDays(30);
    options.LockOnBackground = true;
    options.ExcludeFromBackup = true;
});

await FileVault.Current.WriteTextAsync("notes/pin.txt", "1234", new VaultWriteOptions
{
    TimeToLive = TimeSpan.FromHours(12)
});

var pin = await FileVault.Current.ReadTextAsync("notes/pin.txt");
var stats = await FileVault.Current.GetStatisticsAsync();
```

Device-key vaults unlock on first use. `RequirePassphrase = true` keeps the vault locked until `UnlockAsync`. `ChangePassphraseAsync` rewraps the key. It does not re-encrypt every file.

`UseFileVault` purges expired and idle files on resume. On background, when `LockOnBackground` is true, the vault locks. The in-memory master key is cleared either way. Reading an expired file deletes it and throws `FileVaultException` with `FileVaultError.Expired`.

`RootDirectory` must stay inside the host-chosen folder. `VaultName` cannot climb out with `..`. `DestroyAsync` deletes the files, the manifest, and the stored key. Prefer `GetStatisticsAsync`. The synchronous `GetStatistics()` gives up after 5 seconds if a write holds the gate.

[VideoPipeline](https://nuvyntralabs.github.io/packages/plugin-maui-video-pipeline/) `Encrypt(key)` writes its own AES-256-GCM `.vault` for one clip. FileVault is the store for documents that outlive that call, with a TTL and a lock when the app backgrounds.

## When something looks wrong

| What you see | What to do |
| --- | --- |
| The app switcher still shows the balance | `LockAfter` is still the default grace, or ScreenGuard is not protecting that window. `LockAfter = TimeSpan.Zero` locks immediately. `FLAG_SECURE` blanks the Android thumbnail. |
| Face ID works on a button and the app stays open after background | That button is BiometricPlus. The timer and the cover are AppLock. |
| iOS screenshots still save | ScreenGuard does not block them. Handle `CaptureStateChanged` and show your own overlay. |
| A session token is still readable after eight hours | It was written without `SecureStorageOptions.ExpireIn`. Expiry is checked on the next read. |
| A note file opens with no passphrase after background | `LockOnBackground` is false, or this vault is device-key and unlocks on first use. Set `RequirePassphrase` when the key must not sit in `SecureStorage`. |
| Tokens refresh themselves | That is SecureSession, composed on SecureStoragePlus. AppLock does not store access tokens. |

## Where the five sit next to each other

| Need | Tool |
| --- | --- |
| Hide the app after it backgrounds, then unlock | **AppLock** |
| One prompt on one action | **BiometricPlus** |
| Blank recents, block Android screenshots | **ScreenGuard** |
| Expire a string in the platform secure store | **SecureStoragePlus** |
| Encrypt a file, with TTL and lock | **FileVault** |
| Login, refresh, logout, biometric unlock of the session | [Plugin.Maui.SecureSession](https://nuvyntralabs.github.io/packages/plugin-maui-secure-session/) |

Plugin.Fingerprint and similar biometric libraries are the usual one-shot prompt when the app already uses them. MAUI `SecureStorage` is enough when you do not need expiry, listing, or the extra AES-256-GCM envelope.

## Try it

Register AppLock with a two-minute `LockAfter`, put `AppLockPage` up while `StateChanged` says `Locked`, and call `ScreenGuard.SetProtected` on the balance page. Put the session string in SecureStoragePlus with an expiry. Put the document in FileVault.

- AppLock: [nuget.org](https://www.nuget.org/packages/Plugin.Maui.AppLock) · [GitHub](https://github.com/nuvyntralabs/Plugin.Maui.AppLock) · [package page](https://nuvyntralabs.github.io/packages/plugin-maui-app-lock/)
- BiometricPlus: [nuget.org](https://www.nuget.org/packages/Plugin.Maui.BiometricPlus) · [GitHub](https://github.com/nuvyntralabs/Plugin.Maui.Biometric) · [package page](https://nuvyntralabs.github.io/packages/plugin-maui-biometric/)
- ScreenGuard: [nuget.org](https://www.nuget.org/packages/Plugin.Maui.ScreenGuard) · [GitHub](https://github.com/nuvyntralabs/Plugin.Maui.ScreenGuard) · [package page](https://nuvyntralabs.github.io/packages/plugin-maui-screen-guard/)
- SecureStoragePlus: [nuget.org](https://www.nuget.org/packages/Plugin.Maui.SecureStoragePlus) · [GitHub](https://github.com/nuvyntralabs/Plugin.Maui.SecureStoragePlus) · [package page](https://nuvyntralabs.github.io/packages/plugin-maui-secure-storage-plus/)
- FileVault: [nuget.org](https://www.nuget.org/packages/Plugin.Maui.FileVault) · [GitHub](https://github.com/nuvyntralabs/Plugin.Maui.FileVault) · [package page](https://nuvyntralabs.github.io/packages/plugin-maui-file-vault/)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
