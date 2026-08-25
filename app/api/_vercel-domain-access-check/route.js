export const dynamic = "force-dynamic";

const TEAM_ID = "team_20Vq4J5oHxCfaktQIYc4wu0t";
const PROJECTS = ["masondtorres-site", "bookops-studio"];

export async function GET() {
  const token = process.env.VERCEL_OIDC_TOKEN;

  if (!token) {
    return Response.json({ hasOidcToken: false }, { status: 503 });
  }

  const checks = {};

  for (const project of PROJECTS) {
    try {
      const response = await fetch(
        `https://api.vercel.com/v9/projects/${project}/domains?teamId=${TEAM_ID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        },
      );
      checks[project] = response.status;
    } catch {
      checks[project] = "request-failed";
    }
  }

  return Response.json({ hasOidcToken: true, checks });
}
