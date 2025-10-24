import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	/**
	 * Server-side environment variables schema.
	 * These must exist at build time.
	 */
	server: {
		AUTH_SECRET:
			process.env.NODE_ENV === "production"
				? z.string()
				: z.string().optional(),

		// ✅ Google OAuth credentials
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),

		// ✅ Database connection URL (Postgres)
		DATABASE_URL: z.string().url(),

		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
	},

	/**
	 * Client-side environment variables schema.
	 * To expose vars to the browser, prefix them with NEXT_PUBLIC_.
	 */
	client: {
		// NEXT_PUBLIC_EXAMPLE: z.string().optional(),
	},

	/**
	 * Runtime environment mappings.
	 * Needed because destructuring process.env directly doesn't work in edge runtimes.
	 */
	runtimeEnv: {
		AUTH_SECRET: process.env.AUTH_SECRET,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		DATABASE_URL: process.env.DATABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
	},

	/**
	 * Use `SKIP_ENV_VALIDATION=1` when building if you want to skip validation (useful for Docker).
	 */
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,

	/**
	 * Makes empty strings throw validation errors.
	 */
	emptyStringAsUndefined: true,
});
