import { profile } from "@/data/profile";

/**
 * A small retrieval chatbot trained on Zain's CV. No external AI service:
 * every answer below is written from the CV, and questions are matched to
 * answers by phrase / keyword scoring (with typo tolerance and Roman Urdu).
 * To teach it something new, add an entry to `KNOWLEDGE` or `TECH`.
 */

type Entry = {
  id: string;
  triggers: string[];
  answer: string;
  follow?: string[];
};

const email = profile.email;

const KNOWLEDGE: Entry[] = [
  {
    id: "greeting",
    triggers: ["hi", "hello", "hey", "hii", "salam", "assalam o alaikum", "assalamualaikum", "aoa", "good morning", "good evening", "kaise ho", "kese ho", "how are you", "whats up"],
    answer:
      "Hey, nice to meet you! I'm the AI version of Zain. I can tell you about my projects, the tech I work with, my experience, or whether I'd fit a role you're hiring for. What would you like to know?",
    follow: ["Tell me about yourself", "What are you working on right now?"],
  },
  {
    id: "thanks",
    triggers: ["thanks", "thank you", "thankyou", "shukriya", "shukria", "jazakallah", "great", "awesome", "nice", "cool", "perfect", "got it"],
    answer: "Anytime! If you'd like to talk properly, my email is " + email + " and I'm easy to find on LinkedIn too.",
    follow: ["How can I contact you?", "Can I download your CV?"],
  },
  {
    id: "bye",
    triggers: ["bye", "goodbye", "see you", "allah hafiz", "khuda hafiz", "take care"],
    answer: "Thanks for stopping by! If you want to continue the conversation, drop me an email at " + email + ".",
  },
  {
    id: "about",
    triggers: ["about yourself", "about you", "who are you", "introduce", "introduction", "tell me about zain", "about zain", "who is zain", "apne bare mein", "apna taaruf", "taaruf", "kaun ho"],
    answer:
      "I'm Zain, a software engineer in Lahore focused on .NET backends. I work with C#, .NET 8, ASP.NET Core, PostgreSQL and SQL Server, and I build microservices that sync enterprise systems with Microsoft Dynamics 365, RabbitMQ background processing and screens on a no-code platform. I'm a Software Engineer at Techverx since May 2025.",
    follow: ["What are your strongest skills?", "Tell me about the HSV project"],
  },
  {
    id: "ai",
    triggers: ["are you ai", "are you real", "are you a bot", "are you human", "are you robot", "chatgpt", "is this ai", "how do you work", "who built you", "who made you", "kya tum bot ho", "tum bot ho", "real ho"],
    answer:
      "I'm a small assistant built into this site, so yes, I'm a bot, not Zain typing live. I only know what's in his CV and projects, so I won't make things up, but I also can't answer beyond that. For anything else, email him at " + email + ".",
    follow: ["Tell me about yourself", "How can I contact you?"],
  },
  {
    id: "current",
    triggers: ["working on right now", "currently working", "current job", "current role", "current company", "right now", "abhi kya kar", "kahan kaam kar", "present job", "techverx"],
    answer:
      "Since May 2025 I've been a Software Engineer at Techverx in Lahore. I build .NET 8 microservices behind an Ocelot gateway that sync healthcare transportation and interpretation data to Microsoft Dynamics 365, a business rules engine, and screens for the HSV platform on the CCF no-code framework. I also work on backend modules for the Friday restaurant POS.",
    follow: ["Tell me about the HSV project", "Tell me about the CRM integration"],
  },
  {
    id: "experience",
    triggers: ["experience", "work history", "career", "years", "companies", "worked at", "previous jobs", "tajurba", "tajriba", "kitna experience", "where have you worked", "background"],
    answer:
      "Three roles so far. Techverx (May 2025 to now) as Software Engineer on Dynamics 365 integrations, the HSV healthcare platform and Friday POS. Top Edge Technologies (May 2024 to Apr 2025) as Associate Software Engineer, building the HRango HRMS and booking / order APIs. And DukanLay (Jan to Apr 2024), a .NET internship on BankMind.ai, a loan platform for a US client.",
    follow: ["What did you do at Top Edge?", "What are your strongest skills?"],
  },
  {
    id: "topedge",
    triggers: ["top edge", "topedge", "hrango", "hrms", "employee tracking", "multan"],
    answer:
      "At Top Edge Technologies (May 2024 to Apr 2025) I built HRango HRMS features for recruitment, onboarding, attendance and performance with .NET 6, ASP.NET Core MVC and Razor Pages, a SignalR live activity feed, and a WPF background app for screenshot capture and process monitoring. I also built booking and order APIs with EF Core and Hangfire email jobs.",
    follow: ["Do you have SignalR experience?", "Tell me about your experience"],
  },
  {
    id: "dukanlay",
    triggers: ["dukanlay", "dukan lay", "intern", "internship", "bankmind", "bank mind", "loan", "first job", "fintech"],
    answer:
      "My internship at DukanLay ran January to April 2024. I contributed to BankMind.ai, a loan application platform for a US client, working on the Blazor frontend and .NET 8 APIs, RabbitMQ asynchronous processing, background jobs and SignalR live status updates.",
    follow: ["Tell me about your experience", "What did you do at Top Edge?"],
  },
  {
    id: "projects",
    triggers: ["projects", "portfolio", "what have you built", "what did you build", "your work", "built", "kaam dikhao", "projects batao"],
    answer:
      "The main ones: a Dynamics 365 CRM integration platform, my featured project. HSV, a healthcare services platform on the CCF no-code framework. Friday POS, a restaurant platform. HRango, an HRMS. BankMind.ai, a loan platform for a US client. And a Salon Reservation System from university. Which one should I go deeper on?",
    follow: ["Tell me about the HSV project", "Tell me about the CRM integration"],
  },
  {
    id: "hsv",
    triggers: ["hsv", "healthcare", "claims", "claimant", "referral", "referrals", "trip", "legs", "ccf", "common central framework", "no code", "low code", "lowcode", "nocode"],
    answer:
      "HSV handles claims, referrals and trip management for healthcare transportation and interpretation. On the CCF no-code platform I built Claimant & Claim management, Referral Intake and Referral Detail screens with JSON layouts and JavaScript. I automated trip leg generation with distance and pickup-time calculation, and built a one-click Post to CRM flow that syncs everything to Dynamics 365 without duplicates. RabbitMQ and a background worker handle async processing.",
    follow: ["Tell me about the CRM integration", "Do you have RabbitMQ experience?"],
  },
  {
    id: "crm",
    triggers: ["crm", "dynamics", "dynamics 365", "d365", "dataverse", "integration", "business rules", "bre", "orders", "ocelot", "gateway", "monitoring"],
    answer:
      "The CRM integration platform is a set of .NET 8 microservices behind an Ocelot gateway that move partner orders through quotes, bills, exception pricing, staffing status, itinerary changes and cancellations into Dynamics 365 via the Dataverse SDK. I built a business rules engine that validates data before it reaches the CRM, and API Calls / API Log dashboards on CCF for troubleshooting. Customizing CRM entities and workflows cut manual processing by 30%.",
    follow: ["Do you have microservices experience?", "How is your security and auth experience?"],
  },
  {
    id: "friday",
    triggers: ["friday", "fridaypos", "pos", "restaurant", "point of sale", "backoffice"],
    answer:
      "Friday POS is a restaurant platform covering point-of-sale, orders, menu, payments and back-office operations. Since August 2025 I've built backend modules and REST APIs for it with ASP.NET Core, C#, SQL Server and EF Core, and fixed bugs and shipped enhancements with the team.",
    follow: ["Tell me about the HSV project", "What databases do you use?"],
  },
  {
    id: "salon",
    triggers: ["salon", "reservation", "booking system", "university project"],
    answer:
      "The Salon Reservation System was a university project: appointment booking, service selection, time-slot availability and user management, built with ASP.NET Core MVC, SQL Server and role-based REST APIs.",
    follow: ["Tell me about your projects", "What are your strongest skills?"],
  },
  {
    id: "skills",
    triggers: ["skills", "tech stack", "stack", "technologies", "strongest", "best at", "good at", "expertise", "what do you know", "kya aata hai", "skills batao"],
    answer:
      "My core is C#, .NET 8 and ASP.NET Core with REST APIs, Entity Framework Core and PostgreSQL or SQL Server. Around that: Microsoft Dynamics 365 through the Dataverse SDK, RabbitMQ and MassTransit for messaging, SignalR for real time, JWT and Keycloak for security, and Docker, Serilog, Grafana Loki and Prometheus for running things in production.",
    follow: ["Do you have RabbitMQ experience?", "What databases do you use?"],
  },
  {
    id: "databases",
    triggers: ["database", "databases", "sql", "db", "data modeling", "queries"],
    answer:
      "PostgreSQL and SQL Server are the ones I use most, plus MySQL, and Redis for caching. I've also used MongoDB and Firebase Realtime Database. I work with EF Core, Dapper and LINQ for data access.",
    follow: ["Tell me about the HSV project", "What are your strongest skills?"],
  },
  {
    id: "security",
    triggers: ["security", "auth", "authentication", "authorization", "authorisation", "login", "rbac", "role based", "identity", "cybersecurity"],
    answer:
      "On the CRM integration services I secured APIs with JWT and Keycloak plus role-based authorization, behind an Ocelot gateway. I'm also learning cybersecurity fundamentals on my own right now.",
    follow: ["Tell me about the CRM integration", "Do you have microservices experience?"],
  },
  {
    id: "multitenancy",
    triggers: ["multi tenant", "multitenant", "multi tenancy", "multitenancy", "tenant", "tenants"],
    answer:
      "Yes. HSV runs on CCF, Techverx's multi-tenant no-code platform, so the screens, data and background processing I built all work inside that tenant model.",
    follow: ["Tell me about the HSV project", "How is your security and auth experience?"],
  },
  {
    id: "frontend",
    triggers: ["frontend", "front end", "ui", "full stack", "fullstack", "javascript"],
    answer:
      "Honest answer: I'm backend-first. My frontend work at work is the HSV and API-monitoring screens on the CCF no-code platform, written as JSON layouts plus custom JavaScript (forms, grids, modals, validation, API calls), plus Razor Pages on HRango and Blazor on BankMind. React and Angular I've only used in personal practice so far.",
    follow: ["Tell me about the HSV project", "Would you fit a .NET backend role?"],
  },
  {
    id: "fit",
    triggers: ["fit", "hire", "hiring", "good candidate", "why should", "suitable", "role", "position", "job", "opportunity", "naukri", "kaam milega", "recruit", "recruiter", "backend role", "developer role"],
    answer:
      "If you need a .NET backend engineer, I'd say yes. I have hands-on experience with ASP.NET Core microservices, PostgreSQL and SQL Server, Dynamics 365 integration, RabbitMQ background processing, SignalR and API security. If the role is frontend-heavy, I'll be upfront that React and Angular are personal-practice level for me. Tell me about the role and I'll say how it lines up.",
    follow: ["What are your strongest skills?", "Are you available to join?"],
  },
  {
    id: "availability",
    triggers: ["available", "availability", "open to work", "notice period", "join", "joining", "salary", "expected salary", "expectation", "relocate", "relocation", "visa", "remote", "onsite", "freelance"],
    answer:
      "That's not something I can answer from my CV, and I don't want to guess. I'm open to new opportunities, but for notice period, salary, remote or relocation, please email me at " + email + " and I'll reply myself.",
    follow: ["How can I contact you?", "Can I download your CV?"],
  },
  {
    id: "education",
    triggers: ["education", "degree", "university", "ncbae", "ncba", "study", "studied", "graduate", "ms", "msc", "masters", "college", "parhai"],
    answer:
      "I'm doing an MS in Computer Science at NCBA&E, Multan (2025 to 2027), and I already have an M.Sc. in Information Technology from the University of Education, Multan.",
    follow: ["Tell me about your experience", "What are your strongest skills?"],
  },
  {
    id: "contact",
    triggers: ["contact", "email", "mail", "phone", "number", "call", "reach", "linkedin", "github", "whatsapp", "rabta", "message you", "talk to you", "get in touch"],
    answer:
      "Email is the best way: " + email + ". My phone is " + profile.phone + ", and I'm on LinkedIn and GitHub too. Both links are at the bottom of the page.",
    follow: ["Can I download your CV?", "Are you available to join?"],
  },
  {
    id: "location",
    triggers: ["where are you", "location", "based", "city", "country", "lahore", "pakistan", "kahan rehte", "kahan se"],
    answer: "I'm based in Lahore, Pakistan.",
    follow: ["Are you available to join?", "How can I contact you?"],
  },
  {
    id: "cv",
    triggers: ["cv", "resume", "download", "pdf", "curriculum"],
    answer:
      "Sure. There's a Download CV button at the top of the page and in the contact section at the bottom, and it gives you my latest CV as a PDF.",
    follow: ["How can I contact you?", "Tell me about your experience"],
  },
  {
    id: "teamwork",
    triggers: ["team", "teamwork", "collaborate", "collaboration", "communication", "qa", "agile", "production issues", "debug", "debugging", "bugs"],
    answer:
      "I work in Agile/Scrum teams with code reviews and sprint planning. For production issues on the CRM integration I built API Calls and API Log dashboards that show each request, the CRM request, the response and the service logs, which makes tracking down a failure much faster.",
    follow: ["Tell me about the CRM integration", "What are your strongest skills?"],
  },
  {
    id: "messaging",
    triggers: ["background workers", "background jobs", "message queue", "messaging", "event driven", "async processing", "microservices"],
    answer:
      "I work with RabbitMQ and MassTransit for asynchronous processing and background workers in a microservices setup with Ocelot as the gateway. On HSV a background worker handles processing between services, on BankMind.ai I worked on RabbitMQ-driven loan processing, and I've used Hangfire for scheduled jobs.",
    follow: ["Tell me about the HSV project", "Tell me about the CRM integration"],
  },
];

/** Technology → where I used it. Drives "do you know X?" questions. */
const TECH: Record<string, { names: string[]; answer: string }> = {
  csharp: { names: ["csharp", "c#"], answer: "Yes, C# is my main language. I use it every day at Techverx for ASP.NET Core microservices and workers, and I used it at Top Edge and DukanLay before that." },
  dotnet: { names: ["dotnet", "net core", "aspnet", "asp net", "net 8", "net8", "net 6", "mvc"], answer: "Yes, .NET is my core stack: .NET 8 microservices at Techverx, .NET 6 with ASP.NET Core MVC and Razor Pages on HRango, and .NET 8 on BankMind.ai." },
  efcore: { names: ["entity framework", "ef core", "efcore", "dapper", "linq"], answer: "Yes. I use Entity Framework Core and LINQ regularly, and Dapper too, with PostgreSQL and SQL Server." },
  rabbitmq: { names: ["rabbitmq", "rabbit mq", "masstransit", "mass transit"], answer: "Yes. At Techverx I use RabbitMQ with MassTransit consumers and a background worker for async processing between microservices, and on BankMind.ai I worked on RabbitMQ-driven loan processing." },
  dynamics: { names: ["dynamics", "d365", "dataverse", "crm"], answer: "Yes, it's my main integration work. I sync claimants, claims, referrals, addresses, trip legs and notes to Microsoft Dynamics 365 through the Dataverse SDK, and customized CRM entities, workflows and mappings." },
  postgres: { names: ["postgres", "postgresql", "postgre"], answer: "Yes, PostgreSQL is behind the HSV platform and the CCF framework I work on at Techverx." },
  sqlserver: { names: ["sql server", "sqlserver", "mssql", "mysql"], answer: "Yes. SQL Server backs Friday POS and my earlier ASP.NET work, and I've used MySQL too." },
  redis: { names: ["redis", "caching", "cache"], answer: "Yes, I've used Redis for caching in the CRM integration services." },
  keycloak: { names: ["keycloak", "jwt", "oauth", "token"], answer: "Yes. The CRM integration services are secured with JWT and Keycloak plus role-based authorization." },
  signalr: { names: ["signalr", "websocket", "websockets", "realtime", "real time"], answer: "Yes. I built a SignalR live activity feed on HRango, and worked on SignalR live status updates on BankMind.ai." },
  blazor: { names: ["blazor", "razor", "razor pages"], answer: "Yes. I used Razor Pages on HRango and worked on the Blazor frontend of BankMind.ai." },
  wpf: { names: ["wpf", "desktop"], answer: "Yes. I built a WPF background app for HRango that handles secure login, screenshot capture and process monitoring, and syncs through REST APIs." },
  hangfire: { names: ["hangfire", "scheduled jobs", "cron"], answer: "Yes, I've used Hangfire for scheduled email notification jobs." },
  docker: { names: ["docker", "container", "containers", "azure devops", "cicd", "ci cd"], answer: "Yes. Docker and Azure DevOps pipelines are part of my toolset, alongside Git, Postman and Swagger." },
  observability: { names: ["prometheus", "grafana", "loki", "serilog", "logging", "observability"], answer: "Yes. The CRM integration services use Serilog with Grafana Loki and Prometheus health checks, which helps a lot when tracking down production issues." },
  react: { names: ["react", "reactjs", "angular", "nextjs", "next js"], answer: "Only in personal practice so far, not in production work. My professional frontend work is JavaScript on the CCF no-code platform, Razor Pages and Blazor." },
};

/** Technologies that are NOT in my CV, so the bot answers honestly. */
const MISSING = ["python", "django", "flask", "java", "spring", "vue", "svelte", "nestjs", "nest js", "node", "express", "kubernetes", "k8s", "gcp", "aws", "graphql", "golang", "go lang", "php", "laravel", "flutter", "react native", "swift", "kotlin", "rust", "ruby", "rails", "terraform", "kafka", "elasticsearch", "machine learning", "tensorflow", "pytorch"];

const FALLBACK =
  "Hmm, I don't have that in my CV, and I'd rather not guess. You can ask me about my projects, skills, experience or whether I'd fit a role, or email me at " +
  email +
  " for anything else.";

export const STARTERS = [
  "What are you working on right now?",
  "Tell me about the CRM integration",
  "Do you have RabbitMQ experience?",
  "Would you fit a .NET backend role?",
];

function normalize(text: string): string {
  return (
    " " +
    text
      .toLowerCase()
      .replace(/c#/g, "csharp")
      .replace(/\.net/g, "dotnet")
      .replace(/[.\-_/]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim() +
    " "
  );
}

function edits1(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let diff = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++diff > 1) return false;
    if (a.length > b.length) i++;
    else if (a.length < b.length) j++;
    else {
      i++;
      j++;
    }
  }
  return diff + (a.length - i) + (b.length - j) <= 1;
}

/** Whole-phrase match, plus one-typo tolerance for longer single words. */
function matches(query: string, tokens: string[], trigger: string): boolean {
  const t = normalize(trigger);
  if (query.includes(t)) return true;
  const word = t.trim();
  if (word.length >= 6 && !word.includes(" ")) {
    return tokens.some((token) => edits1(token, word));
  }
  return false;
}

function score(query: string, tokens: string[], triggers: string[]): number {
  let total = 0;
  for (const trigger of triggers) {
    if (matches(query, tokens, trigger)) {
      total += 1 + normalize(trigger).trim().split(" ").length * 0.6;
    }
  }
  return total;
}

export type BotReply = { text: string; follow: string[] };

export function reply(question: string): BotReply {
  const query = normalize(question);
  const tokens = query.trim().split(" ");

  // 1. A specific technology being asked about wins.
  const askedAboutTech = /(experience|know|use|used|using|work|worked|familiar|skill|comfortable|hands on|knowledge|about|aata|aati|karti|kiya)/.test(
    query,
  );
  for (const tech of Object.values(TECH)) {
    if (tech.names.some((name) => matches(query, tokens, name))) {
      if (askedAboutTech || tokens.length <= 3) {
        return { text: tech.answer, follow: ["What are your strongest skills?", "Tell me about your projects"] };
      }
    }
  }

  // 2. A technology that is not in the CV: be honest.
  const missing = MISSING.find((name) => query.includes(normalize(name)));
  if (missing) {
    return {
      text: `${missing[0].toUpperCase()}${missing.slice(1)} isn't something I've listed on my CV, so I won't claim it. My strengths are C#, .NET 8 and ASP.NET Core, PostgreSQL and SQL Server, Dynamics 365 integration and RabbitMQ. I learn quickly though, so email me at ${email} if it's important for your role.`,
      follow: ["What are your strongest skills?", "Would you fit a .NET backend role?"],
    };
  }

  // 3. Best matching topic.
  let best: Entry | null = null;
  let bestScore = 0;
  for (const entry of KNOWLEDGE) {
    const s = score(query, tokens, entry.triggers);
    if (s >= bestScore && s > 0) {
      best = entry;
      bestScore = s;
    }
  }

  if (best && bestScore >= 1.5) {
    return { text: best.answer, follow: best.follow ?? STARTERS.slice(0, 2) };
  }
  return { text: FALLBACK, follow: STARTERS.slice(0, 3) };
}
