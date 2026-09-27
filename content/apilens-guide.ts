import type { DocSection } from "@/content/mvvmexpress";
import type { GuideNavGroup, GuideTopic } from "@/content/mvvmexpress-guide";
import { apiLens, apiLensDocsBase, apiLensHref } from "@/content/apilens";
import { dotnetHref } from "@/content/dotnet";

export interface ApiLensGuidePage {
  slug: string;
  title: string;
  description: string;
  href: string;
  kind: "docs";
  sections: DocSection[];
}

const gettingStartedSections: DocSection[] = [
  {
    id: "what-it-answers",
    title: "What a request explains",
    blocks: [
      {
        type: "p",
        text: "**ApiLens** is developer-first runtime diagnostics for ASP.NET Core. It answers why one request was slow or failed. Collection stays on `System.Diagnostics`: the ApiLens middleware, EF Core command events, and `System.Net.Http` activities.",
      },
      {
        type: "p",
        text: "ASP.NET Core already exposes request, routing, and exception metrics. OpenTelemetry already collects traces and metrics. ApiLens sits above both and explains a single request. It does not ship a second telemetry pipeline.",
      },
      {
        type: "ul",
        items: [
          "A timeline of endpoint time, EF Core commands, and outbound `HttpClient` calls.",
          "Explain percentages as a share of wall-clock time.",
          "A repeated SQL shape reported as a possible N+1.",
          "A development dashboard at `/_apilens`.",
        ],
      },
      {
        type: "p",
        text: "The NuGet id is `NuvyntraLabs.NET.ApiLens`. [endjin/ApiLens](https://github.com/endjin/ApiLens) is a different project: an XML documentation search tool.",
      },
      {
        type: "callout",
        title: "Version 0.1.0",
        text: "Hosts are MVC and minimal APIs. Target framework is net10.0. Redis, OpenTelemetry export, and an AI explain layer are later packages in the same repository. They are not part of this version.",
      },
    ],
  },
  {
    id: "install",
    title: "Install",
    blocks: [
      {
        type: "code",
        code: apiLens.install,
      },
      {
        type: "p",
        text: "The app references the ASP.NET Core, Entity Framework Core, and HTTP packages. `NuvyntraLabs.NET.ApiLens.UI` is pulled in by the ASP.NET Core package. Core has no ASP.NET reference, so the timeline can be tested without a host.",
      },
      {
        type: "callout",
        title: "Publish is pipeline-only",
        text: "0.1.0 is on nuget.org. CI packs net10.0 and pushes nupkg and snupkg to nuget.org and GitHub Packages. Do not dotnet nuget push from a local clone.",
      },
      {
        type: "link",
        href: `${apiLensDocsBase}/packages/`,
        label: "Package roles",
        note: "What each assembly owns:",
      },
    ],
  },
  {
    id: "register",
    title: "Register",
    blocks: [
      {
        type: "code",
        code: apiLens.register,
      },
      {
        type: "p",
        text: "`AddApiLens()` lives on the ASP.NET Core package. EF Core and HTTP reference core only and write into the active request. Call `UseApiLens()` before endpoints so the middleware wraps the request.",
      },
      {
        type: "table",
        headers: ["Option", "Default"],
        rows: apiLens.defaults.map((item) => [item.name, item.value]),
      },
      {
        type: "p",
        text: "Leave `Capture` null unless the host environment is the wrong signal. A null value keeps redacted SQL text in Development and timings only everywhere else.",
      },
      {
        type: "link",
        href: `${apiLensDocsBase}/capture/`,
        label: "Capture and privacy",
        note: "What is stored:",
      },
    ],
  },
  {
    id: "sample",
    title: "Sample",
    blocks: [
      {
        type: "code",
        code: apiLens.sample,
      },
      {
        type: "p",
        text: "The sample is an in-memory SQLite web app. `GET /` redirects to `/_apilens`. `GET /api/orders` loads every order, then queries each row again so the dashboard can show a repeated SQL shape.",
      },
      {
        type: "link",
        href: `${apiLensDocsBase}/dashboard/`,
        label: "Dashboard",
        note: "Open it only in Development:",
      },
    ],
  },
];

const timelineSections: DocSection[] = [
  {
    id: "stored",
    title: "What a request stores",
    blocks: [
      {
        type: "p",
        text: "Each completed request keeps method, route, status code, trace id, exception type name, duration, and the operations recorded while that request was active.",
      },
      {
        type: "table",
        headers: ["Operation", "Name", "Extra"],
        rows: [
          ["Endpoint", "The request itself", "Wall-clock duration of the middleware"],
          ["Database", "`SQL`", "Redacted command text in Development, duration, parameter count"],
          ["HTTP", "Destination host", "Duration and status code. Query string is omitted"],
        ],
      },
      {
        type: "p",
        text: "The route is the endpoint pattern when ASP.NET Core assigned a `RouteEndpoint`. Otherwise it is the request path. Query strings are not part of the route.",
      },
    ],
  },
  {
    id: "shares",
    title: "Explain percentages",
    blocks: [
      {
        type: "p",
        text: "Explain percentages are a share of wall-clock time. Middleware, the endpoint, EF Core, and HTTP are nested, so adding their durations would count the same milliseconds more than once.",
      },
      {
        type: "p",
        text: "Overlapping calls are counted once, on the longer call. The timeline still lists every call with its own duration. Time that no database or HTTP call covers is attributed to **Application**.",
      },
      {
        type: "callout",
        title: "Do not sum the timeline",
        text: "The request total is the middleware clock. Contributor percentages already removed overlap. Adding inclusive durations back into that total double-counts nested work.",
      },
      {
        type: "p",
        text: "The primary latency source is the contributor with the largest attributed duration. A request is slow when its duration is longer than `SlowRequestThreshold` (default 500 ms).",
      },
    ],
  },
  {
    id: "n-plus-one",
    title: "Possible N+1",
    blocks: [
      {
        type: "p",
        text: "N+1 is a heuristic. The same redacted SQL shape, repeated at least `NPlusOneRepeatThreshold` times in one request, is reported as a possible N+1. The default threshold is 8. Estimated unnecessary queries are `count - 1`.",
      },
      {
        type: "p",
        text: "The finding is a repeated shape, not a proven missing `Include`. Development may show the redacted command text, truncated to 160 characters. Production still counts the shape and then drops the text.",
      },
      {
        type: "ul",
        items: [
          "Duration exceeds the slow-request threshold, when it does.",
          "Primary latency source and its share of this request.",
          "Concurrent time that was counted once.",
          "Each possible N+1, with the repeat count and the estimated unnecessary queries.",
        ],
      },
    ],
  },
];

const captureSections: DocSection[] = [
  {
    id: "environment",
    title: "Follow the host environment",
    blocks: [
      {
        type: "p",
        text: "`ApiLensOptions.Capture` left null follows the host. Development uses redacted SQL text. Every other environment keeps timings, counts, status codes, and trace ids, and drops SQL text after the N+1 grouping.",
      },
      {
        type: "table",
        headers: ["", "Development", "Production"],
        rows: apiLens.capture.map((row) => [row.surface, row.development, row.production]),
      },
      {
        type: "callout",
        title: "Override only when the environment is the wrong signal",
        text: "Set Capture to Development or Production when the host environment does not match the data you need. Leaving it null is the normal path.",
      },
    ],
  },
  {
    id: "never-stored",
    title: "What is never stored",
    blocks: [
      {
        type: "ul",
        items: [
          "SQL parameter values. The listener may store a parameter count. It never reads the values.",
          "Request bodies and response bodies.",
          "HTTP query strings. Outbound calls keep the host and status code.",
          "Exception messages and stack traces. The report stores `Exception.GetType().Name` only.",
        ],
      },
      {
        type: "p",
        text: "In Development, SQL text is stored after literal redaction. String literals become `'?'` and numeric literals become `?`. Production runs that same grouping, then clears the command text on the stored operations.",
      },
    ],
  },
];

const dashboardSections: DocSection[] = [
  {
    id: "gate",
    title: "When the dashboard is served",
    blocks: [
      {
        type: "p",
        text: "The dashboard is served only when `EnableDashboard` is true and the host environment is Development. `EnableDashboard` defaults to true. Any other environment responds with 404. Setting `EnableDashboard` to false also responds with 404 in Development.",
      },
      {
        type: "callout",
        title: "No production switch",
        text: "There is no option that turns the dashboard on outside Development. Capture can be overridden. The page cannot.",
      },
      {
        type: "p",
        text: "The page is `/_apilens`. Requests under that path are handled by the dashboard and are not stored as application traffic.",
      },
    ],
  },
  {
    id: "page",
    title: "What the page shows",
    blocks: [
      {
        type: "ul",
        items: [
          "Request count, error count, and average duration for the in-memory ring.",
          "Slowest endpoints, with method, route, and duration.",
          "Dependency shares: attributed name and percent of observed time.",
          "A request detail: status, trace id, explain statements, and the timeline.",
        ],
      },
      {
        type: "p",
        text: "The page states that parameter values and request bodies are not stored. Detail JSON also includes contributor percents, concurrent time, operation start and duration, and N+1 findings.",
      },
    ],
  },
  {
    id: "json",
    title: "JSON",
    blocks: [
      {
        type: "table",
        headers: ["Path", "Body"],
        rows: [
          ["`/_apilens`", "Dashboard HTML"],
          ["`/_apilens/api/summary`", "Counts, average duration, slowest endpoints, dependencies"],
          ["`/_apilens/api/requests`", "Brief list: id, method, route, status, duration, slow flag, primary source"],
          ["`/_apilens/api/requests/{id}`", "One report, or 404 when that id is not in the ring"],
        ],
      },
      {
        type: "p",
        text: "Responses send `Cache-Control: no-store`. The store is an in-memory ring, newest first. The default capacity is 200 reports. The oldest report is dropped when the ring is full. Nothing is written to disk.",
      },
    ],
  },
];

const packageSections: DocSection[] = [
  {
    id: "line",
    title: "Package line",
    blocks: [
      {
        type: "p",
        text: "One repository, several NuGet packages. The prefix is `NuvyntraLabs.NET.ApiLens`. Optional probes reference core only. They do not reference each other.",
      },
      {
        type: "table",
        headers: ["Package", "Role"],
        rows: apiLens.packages.map((item) => [`\`${item.id}\``, item.role]),
      },
    ],
  },
  {
    id: "probes",
    title: "How the probes attach",
    blocks: [
      {
        type: "p",
        text: "`AddApiLens()` registers options and the in-memory store. `UseApiLens()` adds the middleware that opens a request scope, times the rest of the pipeline, and writes one report.",
      },
      {
        type: "p",
        text: "`AddApiLensEntityFrameworkCore()` subscribes to `Microsoft.EntityFrameworkCore` diagnostics for `CommandExecuted` and `CommandError`. A command is recorded only when a request scope is active.",
      },
      {
        type: "p",
        text: "`AddApiLensHttp()` adds a delegating handler to `IHttpClientFactory` clients and listens to `System.Net.Http` diagnostics for other `HttpClient` instances. A call the handler already recorded is skipped by the listener, so it is not counted twice.",
      },
      {
        type: "callout",
        title: "Work outside the request is dropped",
        text: "Both probes read RequestScope.Current. A command or HTTP call that runs after the request has finished, or on a background queue, is not attributed.",
      },
    ],
  },
  {
    id: "later",
    title: "Later packages",
    blocks: [
      {
        type: "ul",
        items: [
          "A StackExchange.Redis probe that uses client profiling.",
          "An optional OpenTelemetry exporter. Collection in 0.1.0 stays on DiagnosticSource and Activity.",
          "An optional AI package that reads the existing explanation and does not collect its own data.",
        ],
      },
      {
        type: "p",
        text: "Those packages stay in this repository when they exist. They are not extra products, and they are not part of 0.1.0.",
      },
    ],
  },
];

const limitSections: DocSection[] = [
  {
    id: "hosts",
    title: "Hosts in this version",
    blocks: [
      {
        type: "p",
        text: "0.1.0 times MVC and minimal API requests. SignalR, gRPC, and Blazor circuits are out of this version.",
      },
      {
        type: "p",
        text: "Work that leaves the request is not attributed. A `Channel` write, a Hangfire job, or any other background queue runs outside `RequestScope` and does not appear on the timeline.",
      },
    ],
  },
  {
    id: "omitted",
    title: "Timings this version omits",
    blocks: [
      {
        type: "ul",
        items: [
          "Per-middleware names. ASP.NET Core does not expose them as reliable spans.",
          "JSON serialization time, for the same reason.",
          "DNS, connect, and TLS splits, unless a later HTTP package can read them from `SocketsHttpHandler` without guessing.",
        ],
      },
    ],
  },
  {
    id: "publish",
    title: "Publishing",
    blocks: [
      {
        type: "p",
        text: "Publishing is pipeline-only. Do not `dotnet nuget push` from a local clone. CI packs `net10.0`, produces nupkg and snupkg, and pushes to nuget.org (`NUGET_KEY_NET`) and GitHub Packages.",
      },
      {
        type: "p",
        text: "The hub at [NETEssentials](https://github.com/nuvyntralabs/NETEssentials) maps the requirement to this product. It does not build or publish the packages. Each product repository owns version alignment, tests, pack, and publish.",
      },
      {
        type: "link",
        href: dotnetHref,
        label: ".NET libraries",
        note: "Back to the track:",
      },
    ],
  },
];

const pages: ApiLensGuidePage[] = [
  {
    slug: "getting-started",
    title: "Getting started",
    description:
      "Install ApiLens, register the middleware and probes, and open the sample dashboard in Development.",
    href: `${apiLensDocsBase}/`,
    kind: "docs",
    sections: gettingStartedSections,
  },
  {
    slug: "timeline",
    title: "Request timeline",
    description:
      "Wall-clock shares, overlapping calls counted once, and the possible-N+1 heuristic.",
    href: `${apiLensDocsBase}/timeline/`,
    kind: "docs",
    sections: timelineSections,
  },
  {
    slug: "capture",
    title: "Capture",
    description:
      "What Development stores, what Production drops, and the fields ApiLens never reads.",
    href: `${apiLensDocsBase}/capture/`,
    kind: "docs",
    sections: captureSections,
  },
  {
    slug: "dashboard",
    title: "Dashboard",
    description:
      "The /_apilens page, its JSON, and the Development-only gate. There is no production switch.",
    href: `${apiLensDocsBase}/dashboard/`,
    kind: "docs",
    sections: dashboardSections,
  },
  {
    slug: "packages",
    title: "Packages",
    description:
      "Core, ASP.NET Core, EF Core, HTTP, and the embedded UI — and the probes that are not in 0.1.0.",
    href: `${apiLensDocsBase}/packages/`,
    kind: "docs",
    sections: packageSections,
  },
  {
    slug: "limits",
    title: "Limits",
    description:
      "MVC and minimal APIs in this version, omitted timings, and pipeline-only publishing.",
    href: `${apiLensDocsBase}/limits/`,
    kind: "docs",
    sections: limitSections,
  },
];

const bySlug = new Map(pages.map((page) => [page.slug, page]));

export const apiLensGuideNav: GuideNavGroup[] = [
  {
    id: "start",
    title: "Start here",
    section: "ApiLens",
    items: [
      { title: "Overview", href: apiLensHref },
      { title: "Getting started", href: `${apiLensDocsBase}/` },
    ],
  },
  {
    id: "request",
    title: "One request",
    items: [
      { title: "Request timeline", href: `${apiLensDocsBase}/timeline/` },
      { title: "Capture", href: `${apiLensDocsBase}/capture/` },
      { title: "Dashboard", href: `${apiLensDocsBase}/dashboard/` },
    ],
  },
  {
    id: "library",
    title: "Library",
    items: [
      { title: "Packages", href: `${apiLensDocsBase}/packages/` },
      { title: "Limits", href: `${apiLensDocsBase}/limits/` },
      { title: ".NET libraries", href: dotnetHref },
    ],
  },
];

export function getApiLensDocTopic(topic: string): ApiLensGuidePage | undefined {
  return pages.find((page) => page.slug === topic);
}

export function apiLensDocTopicSlugs(): string[] {
  return pages.filter((page) => page.slug !== "getting-started").map((page) => page.slug);
}

export function allApiLensHrefs(): string[] {
  return [apiLensHref, ...pages.map((page) => page.href)];
}

export function allDotnetHrefs(): string[] {
  return [dotnetHref, ...allApiLensHrefs()];
}

export function adjacentApiLensPages(href: string): {
  previous?: GuideTopic;
  next?: GuideTopic;
} {
  const sequence = apiLensGuideNav.flatMap((group) => group.items);
  const index = sequence.findIndex((item) => item.href === href);
  if (index < 0) return {};
  const previous = sequence[index - 1];
  const next = sequence[index + 1];
  return {
    previous: previous ? { slug: previous.href, title: previous.title, description: "", sections: [] } : undefined,
    next: next ? { slug: next.href, title: next.title, description: "", sections: [] } : undefined,
  };
}

export const apiLensGettingStarted = bySlug.get("getting-started")!;
