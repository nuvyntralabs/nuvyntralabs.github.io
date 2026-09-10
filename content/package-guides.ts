import type { DocSection } from "@/content/mvvmexpress";
import {
  httpForgeComparisonDescription,
  httpForgeComparisonHref,
  httpForgeComparisonSections,
  httpForgeComparisonTitle,
  httpForgeDocsHref,
  httpForgeIntegrationDescription,
  httpForgeIntegrationHref,
  httpForgeIntegrationSections,
  httpForgeIntegrationTitle,
  httpForgeSlug,
  httpForgeTechnicalDescription,
  httpForgeTechnicalSections,
  httpForgeTechnicalTitle,
} from "@/content/http-forge";
import {
  leakAnalyserComparisonDescription,
  leakAnalyserComparisonHref,
  leakAnalyserComparisonSections,
  leakAnalyserComparisonTitle,
  leakAnalyserDocsHref,
  leakAnalyserIntegrationDescription,
  leakAnalyserIntegrationHref,
  leakAnalyserIntegrationSections,
  leakAnalyserIntegrationTitle,
  leakAnalyserSlug,
  leakAnalyserTechnicalDescription,
  leakAnalyserTechnicalSections,
  leakAnalyserTechnicalTitle,
} from "@/content/leak-analyser";
import {
  performanceComparisonDescription,
  performanceComparisonHref,
  performanceComparisonSections,
  performanceComparisonTitle,
  performanceDocsHref,
  performanceIntegrationDescription,
  performanceIntegrationHref,
  performanceIntegrationSections,
  performanceIntegrationTitle,
  performanceSlug,
  performanceTechnicalDescription,
  performanceTechnicalSections,
  performanceTechnicalTitle,
} from "@/content/performance";
import { comparisonHref, comparisonSections } from "@/content/mvvmexpress-comparison";
import { docsBase, getGuideTopic, integrationHref } from "@/content/mvvmexpress-guide";
import { integrationSections, mvvmExpressSlug } from "@/content/mvvmexpress";
import { getDesktopMvvmFamily } from "@/content/desktop-mvvmexpress";
import { wpfMvvmExpressSlug } from "@/content/mvvmexpress-family";
import { wpfComparisonHref, wpfComparisonSections } from "@/content/wpf-mvvmexpress-comparison";
import { getWpfGuideTopic, wpfDocsBase, wpfIntegrationHref } from "@/content/wpf-mvvmexpress-guide";
import { wpfIntegrationSections } from "@/content/wpf-mvvmexpress";

export type PackageGuideKind = "docs" | "integration" | "comparison";

export interface PackageGuidePage {
  title: string;
  description: string;
  sections: DocSection[];
  currentHref: string;
}

export function getPackageGuidePage(slug: string, kind: PackageGuideKind): PackageGuidePage | undefined {
  if (slug === mvvmExpressSlug) {
    if (kind === "docs") {
      const topic = getGuideTopic("introduction");
      if (!topic) return undefined;
      return {
        title: topic.title,
        description: topic.description,
        sections: topic.sections,
        currentHref: `${docsBase}/`,
      };
    }
    if (kind === "integration") {
      return {
        title: `Get started with MVVMExpress`,
        description:
          "From dotnet new mvvmexpress, a Marketplace IDE extension, or NuGet install to a testable ViewModel: 1.3.0 templates, first screen, UseNavigationPage vs UseShell, Playground clone, FakeNavigator / LeakProbe, forms, generators, modules, and the in-repo sample map.",
        sections: integrationSections,
        currentHref: integrationHref,
      };
    }
    return {
      title: "MVVMExpress vs CommunityToolkit, Prism, and ReactiveUI",
      description:
        "An architectural comparison of shipped surfaces plus a syntax map from CommunityToolkit and Prism names. Scores are not BenchmarkDotNet or device RSS. Choose the stack that matches the app — CommunityToolkit for a small ViewModel layer, Prism for URI navigation without Shell, ReactiveUI for Rx-first apps, or MVVMExpress for one application shell.",
      sections: comparisonSections,
      currentHref: comparisonHref,
    };
  }

  if (slug === wpfMvvmExpressSlug) {
    if (kind === "docs") {
      const topic = getWpfGuideTopic("introduction");
      if (!topic) return undefined;
      return {
        title: topic.title,
        description: topic.description,
        sections: topic.sections,
        currentHref: `${wpfDocsBase}/`,
      };
    }
    if (kind === "integration") {
      return {
        title: `Get started with WPF MVVMExpress`,
        description:
          "From dotnet new wpf-mvvmexpress, a Marketplace IDE extension, or NuGet install to a testable ViewModel: 1.0.0 templates, first screen, UseFrameNavigation, Playground clone, FakeNavigator / LeakProbe, and forms.",
        sections: wpfIntegrationSections,
        currentHref: wpfIntegrationHref,
      };
    }
    return {
      title: "WPF MVVMExpress vs CommunityToolkit, Prism, and ReactiveUI",
      description:
        "An architectural comparison of shipped surfaces plus a syntax map from CommunityToolkit and Prism names. Scores are not BenchmarkDotNet or process RSS. Choose the stack that matches the app — CommunityToolkit for a small ViewModel layer, Prism for regions, ReactiveUI for Rx-first apps, or WPF MVVMExpress for one Frame-based application shell.",
      sections: wpfComparisonSections,
      currentHref: wpfComparisonHref,
    };
  }

  const desktop = getDesktopMvvmFamily(slug);
  if (desktop) {
    if (kind === "docs") {
      const topic = desktop.guideTopics.find((item) => item.slug === "introduction");
      if (!topic) return undefined;
      return {
        title: topic.title,
        description: topic.description,
        sections: topic.sections,
        currentHref: `${desktop.docsBase}/`,
      };
    }
    if (kind === "integration") {
      return {
        title: `Get started with ${desktop.platform.label} MVVMExpress`,
        description: `From dotnet new ${desktop.platform.appTemplate}, a Marketplace IDE extension, or NuGet install to a testable ViewModel: 1.0.0 templates, first screen, UseFrameNavigation, Playground clone, FakeNavigator / LeakProbe, and forms.`,
        sections: desktop.integrationSections,
        currentHref: desktop.integrationHref,
      };
    }
    return {
      title: `${desktop.platform.label} MVVMExpress vs CommunityToolkit, Prism, and ReactiveUI`,
      description: `An architectural comparison of shipped surfaces plus a syntax map from CommunityToolkit and Prism names. Scores are not BenchmarkDotNet or process RSS. Choose the stack that matches the app — CommunityToolkit for a small ViewModel layer, Prism for regions, ReactiveUI for Rx-first apps, or ${desktop.platform.label} MVVMExpress for one Frame-based application shell.`,
      sections: desktop.comparisonSections,
      currentHref: desktop.comparisonHref,
    };
  }

  if (slug === httpForgeSlug) {
    if (kind === "docs") {
      return {
        title: httpForgeTechnicalTitle,
        description: httpForgeTechnicalDescription,
        sections: httpForgeTechnicalSections,
        currentHref: httpForgeDocsHref,
      };
    }
    if (kind === "integration") {
      return {
        title: httpForgeIntegrationTitle,
        description: httpForgeIntegrationDescription,
        sections: httpForgeIntegrationSections,
        currentHref: httpForgeIntegrationHref,
      };
    }
    return {
      title: httpForgeComparisonTitle,
      description: httpForgeComparisonDescription,
      sections: httpForgeComparisonSections,
      currentHref: httpForgeComparisonHref,
    };
  }

  if (slug === leakAnalyserSlug) {
    if (kind === "docs") {
      return {
        title: leakAnalyserTechnicalTitle,
        description: leakAnalyserTechnicalDescription,
        sections: leakAnalyserTechnicalSections,
        currentHref: leakAnalyserDocsHref,
      };
    }
    if (kind === "integration") {
      return {
        title: leakAnalyserIntegrationTitle,
        description: leakAnalyserIntegrationDescription,
        sections: leakAnalyserIntegrationSections,
        currentHref: leakAnalyserIntegrationHref,
      };
    }
    return {
      title: leakAnalyserComparisonTitle,
      description: leakAnalyserComparisonDescription,
      sections: leakAnalyserComparisonSections,
      currentHref: leakAnalyserComparisonHref,
    };
  }

  if (slug === performanceSlug) {
    if (kind === "docs") {
      return {
        title: performanceTechnicalTitle,
        description: performanceTechnicalDescription,
        sections: performanceTechnicalSections,
        currentHref: performanceDocsHref,
      };
    }
    if (kind === "integration") {
      return {
        title: performanceIntegrationTitle,
        description: performanceIntegrationDescription,
        sections: performanceIntegrationSections,
        currentHref: performanceIntegrationHref,
      };
    }
    return {
      title: performanceComparisonTitle,
      description: performanceComparisonDescription,
      sections: performanceComparisonSections,
      currentHref: performanceComparisonHref,
    };
  }

  return undefined;
}
