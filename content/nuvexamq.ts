export const nuvexaMqHref = "/nuvexamq/";
export const nuvexaMqDocsBase = "/nuvexamq/docs";

export const nuvexaMq = {
  name: "NuvexaMQ",
  title: "NuvexaMQ",
  version: "0.1.1",
  license: "MIT",
  author: "Niladri Prasad Padhy / Nuventra",
  github: "https://github.com/nuvyntralabs/NuvexaMQ",
  releases: "https://github.com/nuvyntralabs/NuvexaMQ/releases",
  subtitle: "Durable message broker — one append-only log, queues, exchanges, and replayable streams",
  description:
    "Single-node durable message broker. Install the server package, then publish and consume through the NuvexaMQ data port from the language samples. Virtual hosts, users, permissions, exchanges, queues, bindings, and policies follow the RabbitMQ model. The bytes on the socket are NuvexaMQ frames.",
  abstract:
    "NuvexaMQ 0.1.1 stores every message in one append-only log. A queue, a pub/sub fan-out, and a replayable stream are three ways to read that log. An acknowledged publish is on disk. The installer ships the broker and the desktop app for Windows, macOS, and Linux. Applications open TCP 5761 and exchange NuvexaMQ frames. The server, engine, and protocol projects are not NuGet packages.",
  tags: [
    "Message broker",
    "Durable log",
    "Streams",
    "Queues",
    "Exchanges",
    "Management console",
    "Windows",
    "macOS",
    "Linux",
  ],
  capabilities: [
    "One append-only log. Streams, queues, and exchange bindings are three ways to write or read it.",
    "Length-prefixed TCP frames on port 5761. Hello, publish, fetch, ack, nack, exchanges, queues, and bindings.",
    "Virtual hosts, users, configure/write/read permissions, policies, TTL, max length, and dead-letter exchanges.",
    "Management console and HTTP API on 5763, HTTPS on 5764, health and Prometheus text on 5762.",
    "Installer packages for Windows (MSI), macOS (PKG), and Linux (DEB and RPM), plus a desktop window that starts and stops the broker.",
    "Client programs for C#, JavaScript, TypeScript, Python, Java, Go, and the other languages under samples/clients.",
  ],
  listeners: [
    { port: "5761", role: "Data. Clients publish, fetch, and ack here." },
    { port: "5762", role: "Health and metrics. GET /health and GET /metrics." },
    { port: "5763", role: "Management console and HTTP API." },
    { port: "5764", role: "The same console and API over HTTPS." },
  ],
  packages: [
    {
      system: "Windows",
      package: "NuvexaMQ-<version>-win-x64.msi or win-arm64.msi",
      service: "Windows service NuvexaMQ",
      data: "C:\\ProgramData\\NuvexaMQ\\data",
    },
    {
      system: "macOS",
      package: "NuvexaMQ-<version>-osx-arm64.pkg or osx-x64.pkg",
      service: "launchd com.nuventra.nuvexamq",
      data: "/Library/Application Support/NuvexaMQ/data",
    },
    {
      system: "Linux",
      package: "nuvexamq_<version>_amd64.deb or _arm64.deb, and the matching .rpm",
      service: "systemd nuvexamq",
      data: "/var/lib/nuvexamq",
    },
  ],
} as const;
