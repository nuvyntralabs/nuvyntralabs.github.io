---
title: "TlsPin 1.0.2: Reject the Call When the SPKI Pin Does Not Match"
published: false
description: "Plugin.Maui.TlsPin 1.0.2 pins a named HttpClient to SPKI SHA-256 hashes. An empty pin set throws at registration. A mismatch fails the request unless report-only staging is on."
tags: dotnet, maui, tls, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A payment client that accepts any certificate chain will complete the call on the wrong key. The pin has to fail that request.

**Plugin.Maui.TlsPin** is that check. Version **1.0.2** is on nuget.org. `AddTlsPin` attaches SPKI SHA-256 hashes to one named `HttpClient`. An empty pin set throws when you register it. A mismatch fails the request. `ReportOnly` is the staging switch, and it still raises `OnPinFailure`.

This post is the walkthrough: where the pin attaches, why you ship a backup hash, and which HTTP jobs stay on the sibling plugins.

## What TlsPin is

TlsPin is the certificate-pin layer for **.NET MAUI** `HttpClient` on Android, iOS, Mac Catalyst, and Windows. MIT licensed. It targets `net10.0`, `net10.0-android`, `net10.0-ios`, `net10.0-maccatalyst`, and `net10.0-windows10.0.17763.0`.

It does one job: compare the server public key to the hashes you configured.

| | |
| --- | --- |
| Package | [`Plugin.Maui.TlsPin`](https://www.nuget.org/packages/Plugin.Maui.TlsPin) 1.0.2 |
| Registration | `UseTlsPin`, then `AddTlsPin` on the client |
| Pin | `TlsPinSet.SpkiSha256`, base64 SHA-256 of the SPKI |
| Source | [github.com/nuvyntralabs/Plugin.Maui.TlsPin](https://github.com/nuvyntralabs/Plugin.Maui.TlsPin) |
| Docs | [nuvyntralabs.github.io/packages/plugin-maui-tls-pin/](https://nuvyntralabs.github.io/packages/plugin-maui-tls-pin/) |

`UseTlsPin` is a no-op registrar. There is no `Current` singleton. The pin lives on the `IHttpClientBuilder` you already use for that API. Retry, typed REST, and token refresh stay on ApiResilience, HttpForge, and SecureSession.

## Install and pin one host

```bash
dotnet add package Plugin.Maui.TlsPin --version 1.0.2
```

```csharp
using Plugin.Maui.TlsPin;

builder
    .UseMauiApp<App>()
    .UseTlsPin();

builder.Services.AddHttpClient("payments", client =>
{
    client.BaseAddress = new Uri("https://api.example.com");
})
.AddTlsPin(options =>
{
    options.Pins.Add("api.example.com", new TlsPinSet
    {
        SpkiSha256 = { primary, backup }
    });
});
```

`primary` and `backup` are base64 SHA-256 hashes of `certificate.PublicKey.ExportSubjectPublicKeyInfo()`. `TlsPin.ComputeSpkiSha256` produces that string from an `X509Certificate2`. Ship at least one backup pin so a planned key rotation does not brick every install on the day the leaf changes.

`AddTlsPin` throws if `Pins` is empty, and it throws if any host set has an empty `SpkiSha256` list. That failure is at registration, before the first request.

`RequireHttps` defaults to true. A host that does not appear in `Pins` fails closed. `AllowUnpinnedHosts` is the opt-in that lets an unlisted host through. Leave it false on the payments client.

## Report-only staging

`ReportOnly` still calls `OnPinFailure` and then allows the request. Use it while you confirm the hash in a build you can still talk to.

```csharp
.AddTlsPin(options =>
{
    options.ReportOnly = true;
    options.OnPinFailure = (host, reason) =>
    {
        // reason is "pin mismatch" or "unpinned host"
    };
    options.Pins.Add("api.example.com", new TlsPinSet
    {
        SpkiSha256 = { primary, backup }
    });
});
```

Turn `ReportOnly` off before the store build. A mismatch then fails the request. `OnPinFailure` still runs, with `"pin mismatch"` or `"unpinned host"`.

Android needs `INTERNET` if the host manifest does not already declare it. There is no pinning permission. iOS needs no extra usage string. ATS stays on because `RequireHttps` is true.

## When something looks wrong

| What you see | What to do |
| --- | --- |
| `TlsPin fail-closed: configure at least one host pin set` | `AddTlsPin` ran with an empty `Pins` dictionary. |
| `TlsPin fail-closed: a host pin set is empty` | A host entry has no `SpkiSha256` value. Add the primary hash and a backup. |
| Every call fails after a certificate rotation | The new SPKI is not in the set. The backup pin is what you rotate in before the leaf changes. |
| Calls succeed in staging and fail in production | Staging still has `ReportOnly = true`. Production does not. |
| A second host on the same client fails | That host is not in `Pins`, and `AllowUnpinnedHosts` is false. Pin it, or give it its own named client. |
| You wanted retries on 401 | That is ApiResilience or SecureSession. TlsPin only checks the key. |

## Where TlsPin sits next to the other tools

| Need | Tool |
| --- | --- |
| SPKI pin on one named `HttpClient`, fail closed | **TlsPin** — `Plugin.Maui.TlsPin` |
| A source-generated REST interface | [Plugin.Maui.HttpForge](https://nuvyntralabs.github.io/packages/plugin-maui-httpforge/) |
| Retry, circuit breaker, offline queue | [Plugin.Maui.ApiResilience](https://nuvyntralabs.github.io/packages/plugin-maui-api-resilience/) |
| Access tokens and 401 refresh | [Plugin.Maui.SecureSession](https://nuvyntralabs.github.io/packages/plugin-maui-secure-session/) |

A custom `HttpClientHandler`, or the platform `TrustManager` / `NSURLSession` pin, is the usual choice when the app already owns that callback. TlsPin is the check when the hash set, the empty-set throw, and `ReportOnly` should sit on the same `IHttpClientBuilder` as the rest of the MAUI HTTP stack.

## Try it

```bash
dotnet add package Plugin.Maui.TlsPin --version 1.0.2
```

Call `UseTlsPin`, then `AddTlsPin` on the payments client with two SPKI hashes. Confirm `OnPinFailure` in a `ReportOnly` build, then ship with `ReportOnly` left false. `samples/Plugin.Maui.TlsPin.Sample` covers the public API.

- NuGet: [Plugin.Maui.TlsPin](https://www.nuget.org/packages/Plugin.Maui.TlsPin)
- Repository: [github.com/nuvyntralabs/Plugin.Maui.TlsPin](https://github.com/nuvyntralabs/Plugin.Maui.TlsPin)
- Sample: [Plugin.Maui.TlsPin.Sample](https://github.com/nuvyntralabs/Plugin.Maui.TlsPin/tree/main/samples/Plugin.Maui.TlsPin.Sample)
- Package page: [nuvyntralabs.github.io/packages/plugin-maui-tls-pin/](https://nuvyntralabs.github.io/packages/plugin-maui-tls-pin/)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
