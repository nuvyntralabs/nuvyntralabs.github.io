export const nuvexaDbHref = "/nuvexadb/";
export const nuvexaDocsBase = "/nuvexadb/docs";
export const nuvexaIntegrationHref = "/nuvexadb/integration/";

export const nuvexaDb = {
  name: "NuvexaDB",
  title: "NuvexaDB",
  packageId: "Nuventra.NuvexaDB",
  version: "1.0.3",
  publishedTag: "v1.0.3",
  license: "MIT",
  author: "Niladri Prasad Padhy / Nuventra",
  github: "https://github.com/nuvyntralabs/NuvexaDB",
  releases: "https://github.com/nuvyntralabs/NuvexaDB/releases",
  releaseTag: "https://github.com/nuvyntralabs/NuvexaDB/releases/tag/v1.0.3",
  subtitle: "Embedded NoSQL database — one engine, one .nvx file, many hosts",
  description:
    "Embedded NoSQL database for .NET and .NET MAUI, with a Native AOT C ABI for Java, Kotlin, Swift, Flutter, React Native, Python, Node.js, Go, and C++. One portable .nvx file (BSON documents on data pages, AES-256-GCM encryption), and a desktop explorer for Windows, macOS, and Linux.",
  abstract:
    "NuvexaDB is a standalone embedded NoSQL engine: collections, NQL (Nuvexa Query Language), optional AES-256-GCM, one .nvx application file, and an IDE. It runs in-process. It is not a network server. .NET and MAUI call the managed engine directly; every other language loads a Native AOT build of that same engine through nuvexa.h (ABI v2). A file written from Kotlin is the same file Data Studio, a MAUI app, and a Swift host open.",
  tags: [
    "NoSQL",
    "Embedded database",
    ".nvx",
    ".NET",
    ".NET MAUI",
    "Java",
    "Kotlin",
    "Swift",
    "Flutter",
    "React Native",
    "Python",
    "Node.js",
    "Go",
    "C++",
    "AES-256-GCM",
    "NQL",
  ],
  capabilities: [
    "One portable .nvx file (BSON documents on 8 KiB pages, format v2; v1 files stay readable).",
    "NQL find / aggregate / update / delete, plus typed LINQ on .NET only.",
    "Optional AES-256-GCM at rest with Argon2id; fail-closed open on a missing key or tamper.",
    "One managed engine plus a Native AOT C ABI — language SDKs must not parse pages.",
    "Nuvexa Data Studio on Windows, macOS, and Linux, plus Visual Studio and VS Code / Cursor editors.",
    "Exclusive lock per path, concurrent reads, WAL crash recovery, backup / compact / restore.",
  ],
} as const;

export const nuvexaPlatforms = [
  {
    slug: "dotnet",
    title: ".NET / .NET MAUI",
    summary: "Managed NuGet. No native zip. Console, MAUI, WPF, WinUI, Avalonia, and Uno.",
    zip: "NuvexaDB-NuGet.zip",
  },
  {
    slug: "java-kotlin",
    title: "Java / Kotlin",
    summary: "Desktop JNA wrapper. Pair the JVM jar with the matching native library.",
    zip: "NuvexaDB-Java-<rid>.zip + NuvexaDB-Native-<rid>.zip",
  },
  {
    slug: "android",
    title: "Android",
    summary: "AAR with libnuvexa.so for arm64-v8a. Same Kotlin API as desktop JVM.",
    zip: "NuvexaDB-Android.zip",
  },
  {
    slug: "swift",
    title: "Swift",
    summary: "Swift package over the C ABI. macOS dylib or iOS Nuvexa.xcframework.",
    zip: "NuvexaDB-Swift-osx-arm64.zip + native / iOS zip",
  },
  {
    slug: "flutter",
    title: "Flutter / Dart",
    summary: "dart:ffi on desktop; xcframework on iOS; jniLibs on Android.",
    zip: "NuvexaDB-Flutter-<rid>.zip + native zip",
  },
  {
    slug: "react-native",
    title: "React Native",
    summary: "Async JS API. Android AAR, iOS xcframework, Node tests via koffi.",
    zip: "NuvexaDB-React-Native-*.zip + Android / iOS packs",
  },
  {
    slug: "python",
    title: "Python",
    summary: "ctypes wheel. NUVEXA_NATIVE_LIB is required.",
    zip: "NuvexaDB-Python-<rid>.zip + NuvexaDB-Native-<rid>.zip",
  },
  {
    slug: "nodejs",
    title: "Node.js",
    summary: "ESM SDK @nuventra/nuvexadb-node. NUVEXA_NATIVE_LIB is required.",
    zip: "NuvexaDB-Node-<rid>.zip + NuvexaDB-Native-<rid>.zip",
  },
  {
    slug: "go",
    title: "Go",
    summary: "cgo wrapper. Linux is the supported interop path.",
    zip: "NuvexaDB-Go-<rid>.zip + NuvexaDB-Native-<rid>.zip",
  },
  {
    slug: "cpp",
    title: "C++",
    summary: "nuvexa.hpp RAII plus nuvexa.h. Link the published shared library.",
    zip: "NuvexaDB-Cpp-<rid>.zip + NuvexaDB-Native-<rid>.zip",
  },
] as const;

export const nuvexaLayers = [
  { name: "Database core", project: "Nuventra.NuvexaDB", role: "Pages, WAL, B+tree, AES-256-GCM, NQL" },
  { name: "Access library", project: "Nuventra.NuvexaDB", role: "NuvexaDatabase / NuvexaCollection / AddNuvexaDB" },
  { name: "Nuvexa Data Studio", project: "Nuventra.NuvexaDB.Explorer", role: "Avalonia desktop IDE on Windows, macOS, and Linux" },
  { name: "Editor extensions", project: "VS Code + Visual Studio", role: "Custom editor / tool window over ExplorerSession" },
  { name: "C ABI", project: "Nuventra.NuvexaDB.Native", role: "Native AOT shared library. JSON in, JSON out" },
  { name: "Language SDKs", project: "bindings/*", role: "Thin overlays over nuvexa.h (ABI v2)" },
] as const;
