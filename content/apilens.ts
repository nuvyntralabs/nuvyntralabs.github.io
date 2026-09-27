export const apiLensHref = "/dotnet/apilens/";
export const apiLensDocsBase = "/dotnet/apilens/docs";

export const apiLens = {
  name: "ApiLens",
  title: "ApiLens",
  packageId: "NuvyntraLabs.NET.ApiLens",
  version: "0.1.0",
  license: "MIT",
  author: "Niladri Prasad Padhy",
  github: "https://github.com/nuvyntralabs/NuvyntraLabs.NET.ApiLens",
  hub: "https://github.com/nuvyntralabs/NETEssentials",
  target: "net10.0",
  dashboardPath: "/_apilens",
  subtitle: "Why an ASP.NET Core request was slow or failed",
  description:
    "Developer-first runtime diagnostics for ASP.NET Core. ApiLens reads System.Diagnostics and explains one request: endpoint time, EF Core commands, and outbound HttpClient calls. It does not replace OpenTelemetry, ASP.NET Core metrics, or a production observability backend.",
  abstract:
    "ApiLens stores a timeline for each MVC or minimal API request, attributes overlapping work as a share of wall-clock time, and flags a repeated SQL shape as a possible N+1. The dashboard is served only in Development. SQL parameter values, request bodies, response bodies, and HTTP query strings are never stored.",
  tags: ["ASP.NET Core", "diagnostics", "EF Core", "HttpClient", ".NET", "NETEssentials"],
  install: `dotnet add package NuvyntraLabs.NET.ApiLens.AspNetCore
dotnet add package NuvyntraLabs.NET.ApiLens.EntityFrameworkCore
dotnet add package NuvyntraLabs.NET.ApiLens.Http`,
  register: `builder.Services.AddApiLens();
builder.Services.AddApiLensEntityFrameworkCore();
builder.Services.AddApiLensHttp();
app.UseApiLens();`,
  sample: `dotnet run --project samples/ApiLens.Sample`,
  packages: [
    {
      id: "NuvyntraLabs.NET.ApiLens",
      role: "Timeline, attribution, N+1, explain rules, and the in-memory ring. No ASP.NET reference.",
    },
    {
      id: "NuvyntraLabs.NET.ApiLens.AspNetCore",
      role: "AddApiLens and UseApiLens for MVC and minimal APIs, plus the dashboard gate.",
    },
    {
      id: "NuvyntraLabs.NET.ApiLens.EntityFrameworkCore",
      role: "EF Core CommandExecuted and CommandError on the active request.",
    },
    {
      id: "NuvyntraLabs.NET.ApiLens.Http",
      role: "Outbound HttpClient timings. Factory clients use a handler. Other clients use the System.Net.Http diagnostic listener.",
    },
    {
      id: "NuvyntraLabs.NET.ApiLens.UI",
      role: "Embedded dashboard page. Referenced by the ASP.NET Core package.",
    },
  ],
  capture: [
    { surface: "Dashboard", development: "On, unless EnableDashboard is false", production: "Off" },
    { surface: "SQL text", development: "Stored after literal redaction", production: "Dropped after grouping" },
    { surface: "Parameter values", development: "Never read", production: "Never read" },
    { surface: "Request and response bodies", development: "Never stored", production: "Never stored" },
    { surface: "HTTP query strings", development: "Not stored (host and status only)", production: "Not stored" },
    { surface: "Exception text", development: "Type name only", production: "Type name only" },
  ],
  defaults: [
    { name: "SlowRequestThreshold", value: "500 ms" },
    { name: "NPlusOneRepeatThreshold", value: "8" },
    { name: "MaxStoredRequests", value: "200" },
    { name: "EnableDashboard", value: "true (Development only)" },
    { name: "Capture", value: "null — follows the host environment" },
  ],
} as const;
