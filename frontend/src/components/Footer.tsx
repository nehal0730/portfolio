import { Profile } from "../types";

export default function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="container-px py-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="font-mono text-xs text-text-faint">
        © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript &amp; Express.
      </p>
      <div className="flex gap-6 font-mono text-xs text-text-muted">
        <a href={profile.links.github} className="hover:text-link">
          GitHub
        </a>
        <a href={profile.links.linkedin} className="hover:text-link">
          LinkedIn
        </a>
        <a href={profile.links.leetcode} className="hover:text-link">
          LeetCode
        </a>
      </div>
    </footer>
  );
}
