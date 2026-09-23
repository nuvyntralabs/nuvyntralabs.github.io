---
title: "Enetro VoIP: A Native Android Dialer for PSTN Calls on Vobiz"
published: false
description: "Enetro VoIP is a native Kotlin Android 12+ dialer for inbound and outbound PSTN through Vobiz. SIP runs over a secure WebSocket, audio is WebRTC, and a small backend wakes the phone with Firebase when the app is closed."
tags: android, kotlin, voip, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A field app that places a phone-network call should look like the phone people already use, and it should still ring after the process has been swiped away.

**Enetro VoIP** is that dialer. It is a native Kotlin app for Android 12 and later. Calls go through [Vobiz](https://vobiz.ai). Signaling is SIP over a secure WebSocket. Audio is WebRTC. A TypeScript backend answers Vobiz webhooks and wakes the handset with Firebase Cloud Messaging.

This post is the walkthrough: what the dialer does, how an outbound call leaves the keypad, how an inbound call arrives when the app is not running, and where this proof sits next to Plugin.Maui.VoipCore.

## What Enetro VoIP is

Enetro VoIP is a public Android proof. The application id is `com.enetro.vobizvoip`. The UI is Jetpack Compose. One Vobiz SIP endpoint is registered per device. One Vobiz number, in E.164, is that device’s caller ID.

The phone holds the SIP username and password. The Vobiz Auth ID and Auth Token stay in the backend. They are not compiled into the APK.

| | |
| --- | --- |
| App | Enetro VoIP · `com.enetro.vobizvoip` |
| Platform | Android 12+ (API 31) · Kotlin · Jetpack Compose |
| Signaling | SIP over `wss://registrar.vobiz.ai:5063/` |
| Media | WebRTC audio (DTLS-SRTP) |
| Wake-up | Firebase Cloud Messaging, including a terminated process |
| Source | [github.com/nuvyntralabs/VOBIZ-VOIP-Call](https://github.com/nuvyntralabs/VOBIZ-VOIP-Call) |
| Research | [nuvyntralabs.github.io/research/vobiz-voip-call/](https://nuvyntralabs.github.io/research/vobiz-voip-call/) |
| Setup | [SETUP_GUIDE.md](https://github.com/nuvyntralabs/VOBIZ-VOIP-Call/blob/main/DOCS/SETUP_GUIDE.md) |

The repository contains the Android app and a local Node.js backend. The backend exposes the Answer URL, call state, and the FCM send. A tunnel publishes that process at an HTTPS origin Vobiz can reach.

## Why the dialer is native

Vobiz ships a Flutter Android sample and a Java REST SDK for the Voice API. The REST SDK does not open a WebRTC audio session, and the sample is not a Kotlin dialer. This proof is the native client: OkHttp for the SIP WebSocket, the Android WebRTC library for media, and a phone-shaped UI on top.

```text
Android dialer
    |  SIP over WSS          WebRTC audio
    v
Vobiz registrar  +  media edge
    |
    v
Public phone network
    ^
    |  Answer and Hangup webhooks
Backend  --Firebase push-->  the same phone
```

Call phases on the device run `IDLE` → `OUTGOING` → `RINGING` → `INCOMING` → `CONNECTING` → `ACTIVE` → `ENDING` → `FAILED`. A finished call is stored as `COMPLETED`, `MISSED`, `DECLINED`, `CANCELED`, or `FAILED`. That history is the app’s own log. It is not written to Android’s system `CallLog`.

## The phone UI

The shell matches a handset dialer.

- **Home** lists recents, grouped into Today, Yesterday, and Older. A matching device contact supplies the name.
- **Search** on Home filters those contacts. A match can be called from the result.
- **Keypad** is the second bottom tab.
- The side menu holds **Contacts**, **Settings**, and **Clear call history**.

A leading `0` is replaced with the country code. A bare national number gets the country code prepended. A number that already starts with `+` is left unchanged. The country code comes from the SIM. With no SIM, Settings **Default country** is used. The last fallback is India (`+91`).

| What was typed | What is dialed |
| --- | --- |
| `+9198…` | Unchanged |
| `0091…` | `00` becomes `+` |
| `098…` | Leading `0` becomes `+` and the country code |
| `987…` | Country code prepended |
| `*` or `#` feature codes | Left as entered |

## Place a call

Outbound starts on the keypad, from a contact, from a recent row, or from another app. The dialer normalizes the number, then asks the backend to start the call. Vobiz dials the PSTN number. When the other phone answers, the WebRTC session carries both directions of audio.

On the call screen the user can mute, route audio to the speaker, send DTMF, and hang up. While a native cellular call is off-hook, the VoIP microphone mutes itself.

## Answer when the app is closed

Every inbound PSTN call is parked in a short-lived Vobiz conference, then delivered by push. The same path runs in the foreground, in the background, and after the app has been removed from Recents.

1. Someone dials this device’s Vobiz number.
2. Vobiz POSTs the Answer webhook. The backend checks that a device registered that DID.
3. The caller is parked in a conference. A high-priority FCM message wakes the phone.
4. The incoming-call screen is shown. On a locked phone that needs notifications, full-screen incoming calls, and unrestricted battery. The app asks for those.
5. Answering registers SIP if needed and joins the same conference. Two-way audio starts.
6. If nobody answers within 30 seconds, the pending call expires and the caller is released. The log row is `MISSED`. Declining writes `DECLINED`.

The caller hears silence, or the conference wait sound, for the few seconds between the push and the app joining. A DID with no registered device is rejected. The backend logs `No device registered this DID`.

Do not test by calling the configured caller ID from the same device.

## What you enter once

**Save and connect** stays disabled until the required fields are valid. SIP credentials are encrypted with an Android Keystore AES-GCM key.

| Settings field | What it is |
| --- | --- |
| SIP username and password | This device’s Vobiz SIP endpoint. One endpoint per phone. |
| Registrar WSS URL | `wss://registrar.vobiz.ai:5063/` |
| SIP domain | `registrar.vobiz.ai` |
| Public backend HTTPS URL | The tunnel in front of the local backend. |
| POC device token | The same `DEVICE_TOKEN` as `backend/.env`. |
| Vobiz caller ID | This device’s DID, E.164, starting with `+`. |
| Default country | Used only when the device has no SIM. |
| Record calls | On by default. Playback is available from Recents. |

A healthy status row reads **Registered and ready for calls** for SIP, and **Online** with **Firebase ready** for the backend. The Vobiz Auth ID, Auth Token, and webhook token are backend secrets. The Answer and Hangup URLs are set on the Vobiz Voice Application, not in the Android form.

Grant microphone, notifications, contacts, phone state, and nearby-devices (Bluetooth) when prompted.

## Let another app place the call

The app does not register as the OS default dialer. Other apps open it with an intent. Numbers are normalized before dialing.

```kotlin
// Open the dialer, optionally pre-filled
startActivity(Intent(Intent.ACTION_DIAL, Uri.parse("tel:+919876543210")))

// Place the call
startActivity(
    Intent("com.enetro.vobizvoip.action.CALL").apply {
        setPackage("com.enetro.vobizvoip")
        putExtra("number", "09876543210")
    },
)
```

The call history, including a recording path when recording is on, is a content provider. The caller declares `com.enetro.vobizvoip.permission.READ_CALL_LOG` and queries `content://com.enetro.vobizvoip.provider.calllog/calls`. Columns include `number`, `display_name`, `type` (`1` incoming, `2` outgoing, `3` missed), `date`, `duration`, and `recording_path`. The provider streams the recording. The backend auth token stays inside Enetro VoIP.

## When something looks wrong

| What you see | What to do |
| --- | --- |
| SIP stays disconnected | Confirm the endpoint username, password, `wss://` registrar, and domain. Use the SIP refresh action in Settings. |
| Backend stays offline | The tunnel URL must be the current `PUBLIC_URL`, and the backend process must be running. `GET /health` on that origin should succeed. |
| Inbound never rings, backend is online | `GET /health` reports Firebase only when the service-account key loaded. The app needs `google-services.json`, notifications, full-screen incoming calls, and unrestricted battery. |
| Caller hears an error and drops | No device has registered that DID. Open the app on the phone that owns the number so it can register. |
| The other device rings | You called device 1’s caller ID. Each handset has its own DID and its own SIP username. |
| Call ends with no answer | The pending inbound call expires after 30 seconds. |
| Two-way audio fails on some networks | STUN alone does not cross every mobile or symmetric NAT. Production media needs TURN. |
| A second open of the same SIP user fights the first | One SIP endpoint per device. Do not share an endpoint across phones. |

## Where this dialer sits next to the other tools

This repository is the Android proof for one vendor path. It is not a MAUI package, and it is not pulled in by `nuvyn init`.

| Need | Tool |
| --- | --- |
| A native Android dialer for Vobiz PSTN, with recents, keypad, and push wake-up | **Enetro VoIP** — [VOBIZ-VOIP-Call](https://github.com/nuvyntralabs/VOBIZ-VOIP-Call) |
| A MAUI session model: call state, hold, mute, pluggable signaling | [Plugin.Maui.VoipCore](https://nuvyntralabs.github.io/packages/plugin-maui-voip-core/) |
| The written map of this proof | [Research: VOBIZ VoIP Call](https://nuvyntralabs.github.io/research/vobiz-voip-call/) |

Use Enetro VoIP when the product is an Android handset on Vobiz and the UI has to be the dialer. Use VoipCore when a .NET MAUI app needs a session model and the signaling stack stays replaceable.

## Try it

You need JDK 17, Android SDK 36, a physical Android 12+ device, Node.js 22+, a tunnel, one Vobiz number, one SIP endpoint for that device, and a Firebase project for `com.enetro.vobizvoip`. A second phone on the public network is the other leg.

```bash
./gradlew testDebugUnitTest assembleDebug
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

Then, in order: status shows ready, an outbound call to the second phone has two-way audio, an inbound call works in the foreground, the same inbound works after the app is swiped away, and a second device rings only when its own caller ID is dialed.

- Repository: [github.com/nuvyntralabs/VOBIZ-VOIP-Call](https://github.com/nuvyntralabs/VOBIZ-VOIP-Call)
- Research page: [nuvyntralabs.github.io/research/vobiz-voip-call/](https://nuvyntralabs.github.io/research/vobiz-voip-call/)
- Setup: [SETUP_GUIDE.md](https://github.com/nuvyntralabs/VOBIZ-VOIP-Call/blob/main/DOCS/SETUP_GUIDE.md)
- Call paths: [CALL_WORKFLOWS.md](https://github.com/nuvyntralabs/VOBIZ-VOIP-Call/blob/main/DOCS/CALL_WORKFLOWS.md)
- Settings and intents: [CONFIGURATION_AND_INTEGRATION.md](https://github.com/nuvyntralabs/VOBIZ-VOIP-Call/blob/main/DOCS/CONFIGURATION_AND_INTEGRATION.md)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
