---
title: "NuvexaDB 1.0.7: One Embedded .nvx File for .NET, MAUI, and Every Other Host"
published: false
description: "NuvexaDB 1.0.7 is an embedded NoSQL engine: collections, NQL, optional AES-256-GCM, and one portable .nvx file. .NET calls it directly. Every other language loads the same engine through a C ABI."
tags: dotnet, nosql, database, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A mobile app, a Kotlin service, and a desktop workbench can share one database file when they all run the same engine.

**NuvexaDB** is that engine. Version **1.0.7** stores BSON documents in a single portable **`.nvx`** file, queries them with **NQL** (Nuvexa Query Language), and can seal the file with **AES-256-GCM**. It runs in-process. .NET and .NET MAUI call the managed library. Java, Kotlin, Swift, Flutter, React Native, Python, Node.js, Go, and C++ load a Native AOT build of the same library through `nuvexa.h` (ABI v2).

A file written from Kotlin is the file Nuvexa Data Studio, a MAUI app, and a Swift host open.

The package id is `Nuventra.NuvexaDB`. The MauiEssentials catalog is published under **Nuvyntra** Labs. Both spellings are intentional.

## What NuvexaDB is

NuvexaDB is a standalone embedded NoSQL database. MIT licensed. One process holds an exclusive lock on a path. Concurrent reads on that open handle are allowed. Writes stay exclusive.

It does two jobs for the host:

1. **`Nuventra.NuvexaDB`** is the engine: pages, WAL, B+tree indexes, NQL, and optional encryption. A .NET app references this package and talks to `NuvexaDatabase`.
2. **`Nuventra.NuvexaDB.Native`** is the same engine compiled to a shared library. Language SDKs pass UTF-8 JSON in and JSON out. They leave page layout inside the engine.

| | |
| --- | --- |
| Engine | [`Nuventra.NuvexaDB`](https://github.com/nuvyntralabs/NuvexaDB) 1.0.7 |
| CLI | `Nuventra.NuvexaDB.Cli` — command `nuvexa` |
| Release | [v1.0.7](https://github.com/nuvyntralabs/NuvexaDB/releases/tag/v1.0.7) |
| Source | [github.com/nuvyntralabs/NuvexaDB](https://github.com/nuvyntralabs/NuvexaDB) |
| Docs | [nuvyntralabs.github.io/nuvexadb/](https://nuvyntralabs.github.io/nuvexadb/) |
| Guides | [Platform integration](https://nuvyntralabs.github.io/nuvexadb/integration/) |

**1.0.7 installs from the GitHub Release zip** that matches your language and CPU. nuget.org and the language package registries are not the install path for this version. Download one zip (plus the native library when the guide says so). Leave the rest of the release page alone.

## Why one file

An embedded store keeps the database next to the app: no server process, no connection string, no second deployment. NuvexaDB adds a written file format so that choice survives a language change.

| Piece | What it gives you |
| --- | --- |
| `.nvx` | One application file. Creates and writes use format 2. Format 1 still opens. |
| Collections | Named sets of documents. `_id` is the primary key. |
| NQL | `find`, `aggregate`, `update`, and `delete` as text, on every host. |
| Indexes | B+tree. Compound indexes. Format 2 numeric keys (`d:`) keep range scans in order. |
| WAL | Crash recovery. A committed insert survives a hard stop. Sibling file: `<path>.nvx-wal`. |
| Encryption | Optional. Argon2id wraps a random data key. AES-256-GCM seals each page. |
| Data Studio | Desktop workbench for the same file on Windows, macOS, and Linux. |

Documents on new pages are BSON. Public APIs stay JSON: `NuvexaDocument.Parse`, NQL, Data Studio, and the C ABI. A payload that still looks like `{…}` reads as legacy UTF-8 JSON, so mixed files stay valid.

## What you need

| Host | What to download from [v1.0.7](https://github.com/nuvyntralabs/NuvexaDB/releases/tag/v1.0.7) |
| --- | --- |
| .NET / .NET MAUI, WPF, WinUI, Avalonia, Uno | `NuvexaDB-NuGet.zip` — the `Nuventra.NuvexaDB` nupkg. No native library. |
| CLI | `NuvexaDB-Cli.zip` — install as a global tool. Keep it out of the app's `PackageReference` list. |
| Java / Kotlin desktop | `NuvexaDB-Java-<rid>.zip` and `NuvexaDB-Native-<rid>.zip` |
| Android | `NuvexaDB-Android.zip` (`libnuvexa.so` for arm64-v8a) |
| Swift | Swift zip plus the macOS dylib, or `NuvexaDB-Native-iOS.zip` (`Nuvexa.xcframework`) |
| Flutter, React Native, Python, Node.js, Go, C++ | The language zip **and** the native zip for that OS and CPU |

`<rid>` is the runtime id in the file name: `osx-arm64`, `osx-x64`, `win-x64`, `win-arm64`, `linux-x64`, `linux-arm64`.

Native library names inside the zip:

| Machine | Library |
| --- | --- |
| macOS | `libnuvexa.dylib` |
| Windows | `nuvexa.dll` |
| Linux and Android | `libnuvexa.so` |
| iOS device and simulator | `Nuvexa.xcframework` |

Python, Node, Flutter desktop, and the JVM fallback read `NUVEXA_NATIVE_LIB` (full path of the library). Swift, Go, and C++ read `NUVEXA_NATIVE_DIR` (the folder that contains it).

## Create a database from .NET

```bash
dotnet new console -n Acme.Store -f net10.0
cd Acme.Store
dotnet add package Nuventra.NuvexaDB --source /path/to/unzipped-nuget
```

`/path/to/unzipped-nuget` is the folder that contains `Nuventra.NuvexaDB.1.0.7.nupkg` after you extract `NuvexaDB-NuGet.zip`.

```csharp
using Nuventra.NuvexaDB;

await using var db = NuvexaDatabase.Create("app.nvx", new NuvexaCreateOptions
{
    EncryptionKey = "correct-horse" // omit or null for a plaintext file
});
// db.FormatVersion == 2

var users = db.GetCollection("users");
await users.InsertAsync(NuvexaDocument.Parse("""{"name":"Ada","age":36}"""));
await users.EnsureIndexAsync("age");
await users.EnsureIndexAsync(["city", "status"]);

var rows = await db.ExecuteAsync(
    """db.users.find({ age: { $gte: 21 } }).sort({ name: 1 }).limit(20)""");
```

`GetCollection` creates the collection when it is missing. `await using` closes the file. One process per path.

On MAUI, put the file under `FileSystem.AppDataDirectory` so the iOS and Android sandbox rules apply. Open it the same way on a later launch:

```csharp
if (NuvexaDatabase.IsEncrypted(path) && string.IsNullOrEmpty(key))
{
    throw new InvalidOperationException("This .nvx is encrypted. Supply EncryptionKey.");
}

await using var opened = NuvexaDatabase.Open(path, new NuvexaOpenOptions
{
    EncryptionKey = key
});
```

There is no `DropDatabase` API. Dispose the handle, then delete the `.nvx` and its `-wal` sibling.

Typed LINQ stays on .NET:

```csharp
var adults = await db.GetCollection<Person>("people").ToListAsync(p => p.Age >= 21);
```

## The same file from another language

Other SDKs call `nuvexa_create`, `nuvexa_insert`, and `nuvexa_execute`. Status codes cross the boundary (`0` ok, `2` encryption, `3` integrity). The SDK frees every returned string with `nuvexa_free`.

Kotlin:

```kotlin
NuvexaDatabase.create("app.nvx", "correct-horse").use { db ->
    db.insert("users", """{"name":"Ada","age":36}""")
    db.execute("db.users.find({ age: { \$gte: 21 } }).limit(20)")
}
```

Swift:

```swift
let db = try NuvexaDatabase.create("app.nvx", key: "correct-horse")
_ = try db.insert(collection: "users", json: #"{"name":"Ada","age":36}"#)
_ = try db.execute("db.users.find({ age: { $gte: 21 } }).limit(20)")
```

Each host guide on the [integration page](https://nuvyntralabs.github.io/nuvexadb/integration/) covers the empty project, the zip to unzip, create / open / close, collections, documents, and the encryption password.

## NQL

NQL is the query text for Data Studio, `ExecuteAsync`, `nuvexa query`, and `nuvexa_execute`. Unquoted keys are accepted.

```javascript
db.users.find({ "address.city": "Bengaluru", age: { $gte: 21 } })
  .sort({ lastName: 1 })
  .limit(20)
  .project({ email: 1 })

db.tickets.find({}).page(2, 200)
```

| Family | Operators |
| --- | --- |
| Find | `$eq` `$ne` `$gt` `$gte` `$lt` `$lte` `$in` `$nin` `$and` `$or` `$exists` `$regex` |
| Update | `$set` `$unset` `$inc` `$push` `$pull` |
| Aggregate | `$match` `$project` `$sort` `$skip` `$limit` `$count` `$group` `$lookup` |

`explain()` reports `ID`, `IXSCAN`, `COLLSCAN`, `AGGREGATE`, `UPDATE`, or `DELETE`. Equality on an index prefix can `IXSCAN`. `$lookup` refuses a foreign collection larger than `LookupMaxDocuments` (default 100 000; `0` disables the cap).

`db.<collection>.update` and `delete` need engine **1.0.2 or later**. GridFS-style bytes go through `db.Files.UploadAsync` / `DownloadAsync` (`fs.files` / `fs.chunks`).

## Encryption

Pass a non-empty `EncryptionKey` at create time and on every later open. The passphrase is UTF-8. It is never written into the file.

The engine derives a key-encryption key with Argon2id (app `Create()` defaults to 16 MiB, which is the mobile setting; Data Studio and the CLI use 64 MiB). A random 32-byte data key wraps the page cipher. A verifier fails a wrong passphrase before any data page is touched. `ChangeEncryptionKeyAsync` re-wraps that data key. Pages stay as they are.

Opening an encrypted file without the key throws `NuvexaEncryptionException`. A tampered or corrupt file throws `NuvexaIntegrityException` and stays closed. The engine does not repair it.

Store the secret in the platform keystore: `SecureStorage` on MAUI, Credential Manager on Windows, Keychain on Apple, Android Keystore on Android. A local demo can use a throwaway string. A shipped app keeps that string out of source, `appsettings.json`, logs, and crash reports.

## Data Studio, the CLI, and the editors

**Nuvexa Data Studio** (`Nuventra.NuvexaDB.Explorer`) is an Avalonia workbench for one `.nvx`. Windows (x64 and ARM64 `.msi`), macOS (unsigned `.pkg` into `/Applications`), and Linux (`.deb` / `.rpm` for x64 and ARM64). Three tabs: Database Structure, Browse Data (200-row pages), and NQL. Import and export JSON or CSV. Compact, backup, restore, and change the encryption key from the Tools menu. Drag a `.nvx` onto the window. An encrypted file asks for the key. Recent files remember the last 12 paths and never the passphrase.

The same session backs the Visual Studio tool window and the VS Code / Cursor custom editor. Those VSIX packages bundle `nuvexa` under `cli/`.

The standalone CLI is a global dotnet tool. Extract `NuvexaDB-Cli.zip` and install from that folder:

```bash
dotnet tool install -g Nuventra.NuvexaDB.Cli --add-source /path/to/NuvexaDB-Cli
```

`nuvexa` covers query, browse, explain, samples, backup, and restore. Do not `dotnet add package` the CLI into an application.

## When something looks wrong

| What you see | What to do |
| --- | --- |
| `NuvexaEncryptionException` | The file is encrypted. Pass the same `EncryptionKey` you used at create. Data Studio prompts; a library call does not. |
| `NuvexaIntegrityException` | Open stopped on CRC, GCM, or HMAC. Leave the file closed. Restore from backup. |
| Second open throws | Another process already holds that path. Close Data Studio, the CLI, or the other app first. |
| Python or Node cannot create | Set `NUVEXA_NATIVE_LIB` to the full path of `libnuvexa` / `nuvexa.dll` from the matching native zip. |
| Package not on nuget.org | Expected for 1.0.7. `dotnet add package` with `--source` pointed at the unzipped `NuvexaDB-NuGet` folder. |
| Old file still opens | Format 1 stays readable. The next write promotes it to format 2. |
| `$lookup` refuses a collection | The foreign side is over `LookupMaxDocuments`. Raise the cap, or set it to `0`. |

## Where NuvexaDB sits next to the other tools

| Need | Tool |
| --- | --- |
| Embedded NoSQL, NQL, encryption, Data Studio, many languages | **NuvexaDB** — `Nuventra.NuvexaDB` |
| MAUI CRUD that can sit on NuvexaDB or SQLite | [Plugin.Maui.LocalStore](https://nuvyntralabs.github.io/packages/plugin-maui-local-store/). `QueryAsync` can run NQL when the backend is Nuvexa. |
| A new MAUI host, with NuvexaDB added when the spec asks | [Nuvyn](https://nuvyntralabs.github.io/toolkits/nuvyn/). `/nuvyn.plan` picks it. It is not in the default `init` set. |
| Browse or query a file you already have | Data Studio, or `nuvexa` |

## Try it

```bash
# After extracting NuvexaDB-NuGet.zip from the v1.0.7 release:
dotnet new console -n Acme.Store -f net10.0
cd Acme.Store
dotnet add package Nuventra.NuvexaDB --source /path/to/unzipped-nuget
```

Create `app.nvx`, insert one document, and run the `find` above. Open that file in Data Studio and run the same NQL in the NQL tab.

- Release: [github.com/nuvyntralabs/NuvexaDB/releases/tag/v1.0.7](https://github.com/nuvyntralabs/NuvexaDB/releases/tag/v1.0.7)
- Repository: [github.com/nuvyntralabs/NuvexaDB](https://github.com/nuvyntralabs/NuvexaDB)
- Product page: [nuvyntralabs.github.io/nuvexadb/](https://nuvyntralabs.github.io/nuvexadb/)
- Integration guides: [nuvyntralabs.github.io/nuvexadb/integration/](https://nuvyntralabs.github.io/nuvexadb/integration/)
- NQL: [nuvyntralabs.github.io/nuvexadb/docs/query/](https://nuvyntralabs.github.io/nuvexadb/docs/query/)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
