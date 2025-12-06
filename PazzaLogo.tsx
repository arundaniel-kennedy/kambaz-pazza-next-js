import * as React from "react";

export default function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  const color = "#fff";
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinejoin: "round",
        strokeMiterlimit: 2,
      }}
      viewBox="0 0 55 14"
      {...props}
    >
      <path
        d="M44.89 2.21h6.58l-6.58 7.6v2.09h9.73V9.81h-6.39l6.39-7.6V.12h-9.73v2.09Z"
        style={{
          fill: color,
          fillRule: "nonzero",
        }}
        transform="matrix(.76752 0 0 .69403 .697 .068)"
      />
      <path
        d="M68.43 5.71C68.189 2.52 65.497.024 62.298.024 58.989.024 56.244 2.693 56.15 6c.054 3.327 2.822 6.028 6.15 6a6.16 6.16 0 0 0 4-1.47v1.37h2.13V5.71ZM62.3 9.89a3.868 3.868 0 0 1-3.85-3.85 3.868 3.868 0 0 1 3.85-3.85A3.908 3.908 0 0 1 66.22 6a3.909 3.909 0 0 1-3.89 3.89h-.03Z"
        style={{
          fill: color,
          fillRule: "nonzero",
        }}
        transform="matrix(.76752 0 0 .69403 2.023 .134)"
      />
      <path
        d="M32.95 2.21h6.57l-6.57 7.6v2.09h9.72V9.81h-6.39l6.39-7.6V.12h-9.72v2.09Z"
        style={{
          fill: color,
          fillRule: "nonzero",
        }}
        transform="matrix(.76752 0 0 .69403 -.099 .068)"
      />
      <path
        d="M6 .17C2.868.121.211 2.565 0 5.69v11.72h2.1v-6.88A5.999 5.999 0 0 0 6 11.9l.09.001c3.224 0 5.883-2.638 5.91-5.861C11.973 2.811 9.309.169 6.08.169L6 .17Zm0 9.59a3.657 3.657 0 0 1-3.831-3.635A3.657 3.657 0 0 1 6 2.49a3.657 3.657 0 0 1 3.831 3.635A3.657 3.657 0 0 1 6 9.76Z"
        style={{
          fill: color,
          fillRule: "nonzero",
        }}
        transform="matrix(.82822 0 0 .7902 .827 .018)"
      />
      <path
        d="M30.79 5.71C30.549 2.52 27.857.024 24.658.024 21.349.024 18.604 2.693 18.51 6c.054 3.327 2.822 6.028 6.15 6a6.213 6.213 0 0 0 4-1.47v1.37h2.12V6.26a1.615 1.615 0 0 0 0-.22 1.615 1.615 0 0 0 0-.22l.01-.11Zm-6.13 4.18a3.868 3.868 0 0 1-3.85-3.85 3.868 3.868 0 0 1 3.85-3.85A3.908 3.908 0 0 1 28.58 6a3.909 3.909 0 0 1-3.89 3.89h-.03Z"
        style={{
          fill: color,
          fillRule: "nonzero",
        }}
        transform="matrix(.76752 0 0 .69403 -.941 .134)"
      />
    </svg>
  );
}
