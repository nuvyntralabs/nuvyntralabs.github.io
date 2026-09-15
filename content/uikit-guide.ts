import type { DocSection } from "@/content/mvvmexpress";
import type { GuideNavGroup, GuideTopic } from "@/content/mvvmexpress-guide";
import { uiKit, uiKitHref } from "@/content/uikit";
import { slugifyHeading } from "@/lib/markdown-docs";
import {
  explainAttribute,
  fullXaml,
  getUiKitComponent,
  inheritedMauiAttributes,
  loadUiKitCatalog,
  type UiKitComponent,
  type UiKitKind,
} from "@/lib/uikit-lib";

export const uiKitDocsBase = "/uikit/docs";

export interface UiKitGuidePage {
  slug: string;
  title: string;
  description: string;
  href: string;
  kind: UiKitKind | "index";
  layer: string;
  sections: DocSection[];
}

function componentHref(slug: string): string {
  return `${uiKitDocsBase}/${slug}/`;
}

function componentDescription(component: UiKitComponent): string {
  return `${component.name} XAML, every kit attribute, and what each attribute does. ${component.summary}`;
}

function componentSections(component: UiKitComponent): DocSection[] {
  const framework = component.kind === "view" || component.kind === "recipe" ? inheritedMauiAttributes() : [];
  const kit = component.attributes;
  const sections: DocSection[] = [
    {
      id: "about",
      title: "About",
      blocks: [
        { type: "p", text: component.summary },
        ...(component.inherits
          ? [
              {
                type: "callout" as const,
                title: `Inherits ${component.inherits}`,
                text: `This page lists ${component.name} members plus inherited kit attributes from ${component.inherits}.`,
              },
            ]
          : []),
        ...(component.kind === "recipe"
          ? [
              {
                type: "callout" as const,
                title: "No extra bindables",
                text: "Page recipes compose NV* controls. They set titles and seed demo children. They do not add new bindable names.",
              },
            ]
          : []),
        ...(component.related.length
          ? [{ type: "p" as const, text: `Related: ${component.related.map((name) => `[${name}](${componentHref(slugifyHeading(name))})`).join(", ")}.` }]
          : []),
      ],
    },
    {
      id: "xaml",
      title: component.kind === "foundation" || component.kind === "helper" ? "API" : "XAML with every attribute",
      blocks: [
        {
          type: "p",
          text:
            component.kind === "foundation" || component.kind === "helper"
              ? `${component.name} is not a XAML view. Register the kit with \`${uiKit.register}\`, then call the members below.`
              : `Namespace \`xmlns:nv="${uiKit.xmlns}"\`. Kit attributes first, then inherited MAUI \`VisualElement\` / \`View\` members. Framework properties are the same on every NV* view and are not repeated in the official control reference.`,
        },
        { type: "code", code: fullXaml(component, uiKit.xmlns) },
      ],
    },
  ];

  if (kit.length) {
    sections.push({
      id: "attributes",
      title: component.kind === "foundation" ? "Members" : "Attributes",
      blocks: [
        {
          type: "p",
          text: "**custom** names are Lumina API. Unmarked names match familiar MAUI / forms usage.",
        },
        {
          type: "table",
          headers: ["Attribute", "Type", "Default", "Kind", "Explanation"],
          rows: kit.map((attribute) => [
            `\`${attribute.name}\``,
            `\`${attribute.type}\``,
            attribute.defaultValue ? `\`${attribute.defaultValue}\`` : "—",
            attribute.inheritedFrom ? `from ${attribute.inheritedFrom}` : attribute.custom ? "custom" : "familiar",
            explainAttribute(attribute, component.name),
          ]),
        },
      ],
    });
  } else if (component.kind === "recipe" || component.kind === "view") {
    sections.push({
      id: "attributes",
      title: "Attributes",
      blocks: [
        {
          type: "p",
          text: `${component.name} adds no kit bindables of its own. Use the inherited MAUI attributes below.`,
        },
      ],
    });
  }

  if (framework.length) {
    sections.push({
      id: "maui",
      title: "Inherited MAUI attributes",
      blocks: [
        {
          type: "p",
          text: "Every `NV*` view also inherits MAUI `ContentView` / `VisualElement` members. Those are framework properties.",
        },
        {
          type: "table",
          headers: ["Attribute", "Type", "Default", "Explanation"],
          rows: framework.map((attribute) => [
            `\`${attribute.name}\``,
            `\`${attribute.type}\``,
            attribute.defaultValue,
            explainAttribute(attribute, component.name),
          ]),
        },
      ],
    });
  }

  if (component.officialSample && component.kind !== "foundation" && component.kind !== "helper") {
    sections.push({
      id: "typical",
      title: "Typical usage",
      blocks: [
        { type: "p", text: "Short sample from the official control reference — not every attribute." },
        { type: "code", code: component.officialSample },
      ],
    });
  }

  return sections;
}

function indexSections(): DocSection[] {
  const { enums, components } = loadUiKitCatalog();
  const layers = groupByLayer(components);
  return [
    {
      id: "start",
      title: "How to read a component page",
      blocks: [
        {
          type: "p",
          text: `Each page shows XAML with **every kit attribute**, then a table that explains the attribute, its type, default, and whether it is Lumina **custom** or a familiar MAUI name. Register with \`${uiKit.register}\` and declare \`xmlns:nv="${uiKit.xmlns}"\`.`,
        },
        {
          type: "code",
          code: `<nv:NVButton Text="Continue" Variant="Filled" Command="{Binding Submit}" />`,
        },
        {
          type: "p",
          text: "On that row, `Text` and `Command` are familiar MAUI names. `Variant` is custom (`NVButtonVariant`: Filled, Tonal, Outline, Ghost, Danger).",
        },
      ],
    },
    {
      id: "enums",
      title: "Enums used as attribute types",
      blocks: [
        {
          type: "table",
          headers: ["Enum", "Values"],
          rows: enums.map((item) => [`\`${item.name}\``, item.values.map((value) => `\`${value}\``).join(", ")]),
        },
      ],
    },
    ...layers.map((group) => ({
      id: slugify(group.layer),
      title: group.layer,
      blocks: [
        {
          type: "ul" as const,
          items: group.items.map(
            (item) => `[${item.name}](${item.href}) — ${item.description.replace(/\s+/g, " ").slice(0, 160)}`,
          ),
        },
      ],
    })),
  ];
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function groupByLayer(components: UiKitComponent[]): { layer: string; items: { name: string; href: string; description: string }[] }[] {
  const order: string[] = [];
  const map = new Map<string, UiKitComponent[]>();
  for (const component of components) {
    if (!map.has(component.layer)) {
      map.set(component.layer, []);
      order.push(component.layer);
    }
    map.get(component.layer)!.push(component);
  }
  return order.map((layer) => ({
    layer,
    items: (map.get(layer) ?? []).map((item) => ({
      name: item.name,
      href: componentHref(item.slug),
      description: item.summary,
    })),
  }));
}

const componentPages: UiKitGuidePage[] = loadUiKitCatalog().components.map((component) => ({
  slug: component.slug,
  title: component.name,
  description: componentDescription(component),
  href: componentHref(component.slug),
  kind: component.kind,
  layer: component.layer,
  sections: componentSections(component),
}));

export const uiKitDocsIndex: UiKitGuidePage = {
  slug: "index",
  title: "Component reference",
  description: `XAML and attribute docs for every ${uiKit.packageId} control, helper, and page recipe.`,
  href: `${uiKitDocsBase}/`,
  kind: "index",
  layer: "Start",
  sections: indexSections(),
};

const pages = [uiKitDocsIndex, ...componentPages];
const bySlug = new Map(pages.map((page) => [page.slug, page]));

export const uiKitGuideNav: GuideNavGroup[] = [
  {
    id: "start",
    title: "Start here",
    items: [
      { title: "Overview", href: uiKitHref },
      { title: "Component reference", href: `${uiKitDocsBase}/` },
    ],
  },
  ...groupByLayer(loadUiKitCatalog().components).map((group) => ({
    id: slugify(group.layer),
    title: group.layer,
    items: group.items.map((item) => ({ title: item.name, href: item.href })),
  })),
];

export function getUiKitGuidePage(slug: string): UiKitGuidePage | undefined {
  return bySlug.get(slug);
}

export function uiKitDocSlugs(): string[] {
  return componentPages.map((page) => page.slug);
}

export function allUiKitHrefs(): string[] {
  return [uiKitHref, ...pages.map((page) => page.href)];
}

export function adjacentUiKitPages(href: string): { previous?: GuideTopic; next?: GuideTopic } {
  const sequence = uiKitGuideNav.flatMap((group) => group.items);
  const index = sequence.findIndex((item) => item.href === href);
  if (index < 0) return {};
  const previous = sequence[index - 1];
  const next = sequence[index + 1];
  return {
    previous: previous ? { slug: previous.href, title: previous.title, description: "", sections: [] } : undefined,
    next: next ? { slug: next.href, title: next.title, description: "", sections: [] } : undefined,
  };
}

export function getUiKitPageBySlug(slug: string): UiKitGuidePage | undefined {
  return getUiKitComponent(slug) ? bySlug.get(slug) : undefined;
}
