interface TerminalPreviewProps {
  colors: Record<string, string>;
}

export function TerminalPreview({ colors }: TerminalPreviewProps) {
  return (
    <div
      className="font-mono text-sm p-4 rounded-lg overflow-auto"
      style={{ backgroundColor: colors.base00, color: colors.base05 }}
    >
      {/* Shell prompt */}
      <div className="mb-4">
        <span style={{ color: colors.base0B }}>user@hostname</span>
        <span style={{ color: colors.base05 }}>:</span>
        <span style={{ color: colors.base0D }}>~</span>
        <span style={{ color: colors.base05 }}>$ </span>
        <span style={{ color: colors.base05 }}>neofetch</span>
      </div>

      {/* Neofetch-style output */}
      <div className="mb-4 flex gap-4">
        {/* ASCII Art */}
        <pre style={{ color: colors.base0D }} className="flex-shrink-0">
{`       _,met$$$$$gg.
    ,g$$$$$$$$$$$$$$$P.
  ,g$$P"     """Y$$.".
 ,$$P'              \`$$$.
',$$P       ,ggs.     \`$$b:
\`d$$'     ,$P"'   .    $$$
 $$P      d$'     ,    $$P
 $$:      $$.   -    ,d$$'
 $$;      Y$b._   _,d$P'
 Y$$.    \`.\`"Y$$$$P"'
 \`$$b      "-.__
  \`Y$$
   \`Y$$.
     \`$$b.
       \`Y$$b.
          \`"Y$b._
              \`""""`}
        </pre>

        {/* System info */}
        <div className="flex-1 space-y-1">
          <div>
            <span style={{ color: colors.base0B }}>user</span>
            <span style={{ color: colors.base05 }}>@</span>
            <span style={{ color: colors.base0B }}>hostname</span>
          </div>
          <div style={{ color: colors.base03 }}>-----------------</div>
          <div>
            <span style={{ color: colors.base0D }}>OS:</span>{' '}
            <span style={{ color: colors.base05 }}>Arch Linux x86_64</span>
          </div>
          <div>
            <span style={{ color: colors.base0D }}>Kernel:</span>{' '}
            <span style={{ color: colors.base05 }}>6.6.10-arch1-1</span>
          </div>
          <div>
            <span style={{ color: colors.base0D }}>Uptime:</span>{' '}
            <span style={{ color: colors.base05 }}>2 hours, 34 mins</span>
          </div>
          <div>
            <span style={{ color: colors.base0D }}>Shell:</span>{' '}
            <span style={{ color: colors.base05 }}>zsh 5.9</span>
          </div>
          <div>
            <span style={{ color: colors.base0D }}>WM:</span>{' '}
            <span style={{ color: colors.base05 }}>i3</span>
          </div>
          <div>
            <span style={{ color: colors.base0D }}>Terminal:</span>{' '}
            <span style={{ color: colors.base05 }}>alacritty</span>
          </div>
          <div>
            <span style={{ color: colors.base0D }}>CPU:</span>{' '}
            <span style={{ color: colors.base05 }}>AMD Ryzen 9 5950X (32) @ 3.400GHz</span>
          </div>
          <div>
            <span style={{ color: colors.base0D }}>Memory:</span>{' '}
            <span style={{ color: colors.base05 }}>8192MiB / 32768MiB</span>
          </div>
          <div className="mt-2 flex gap-1">
            {[colors.base08, colors.base09, colors.base0A, colors.base0B,
              colors.base0C, colors.base0D, colors.base0E, colors.base0F].map((color, i) => (
              <div
                key={i}
                className="w-6 h-4"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ls -la output */}
      <div className="mb-2">
        <span style={{ color: colors.base0B }}>user@hostname</span>
        <span style={{ color: colors.base05 }}>:</span>
        <span style={{ color: colors.base0D }}>~</span>
        <span style={{ color: colors.base05 }}>$ </span>
        <span style={{ color: colors.base05 }}>ls -la</span>
      </div>

      <div className="space-y-1">
        <div>
          <span style={{ color: colors.base0D }}>drwxr-xr-x</span>
          <span style={{ color: colors.base05 }}> 12 user user </span>
          <span style={{ color: colors.base09 }}>4096</span>
          <span style={{ color: colors.base05 }}> Jan 15 10:30 </span>
          <span style={{ color: colors.base0D }}>.</span>
        </div>
        <div>
          <span style={{ color: colors.base0D }}>drwxr-xr-x</span>
          <span style={{ color: colors.base05 }}> 24 root root </span>
          <span style={{ color: colors.base09 }}>4096</span>
          <span style={{ color: colors.base05 }}> Jan 10 08:15 </span>
          <span style={{ color: colors.base0D }}>..</span>
        </div>
        <div>
          <span style={{ color: colors.base05 }}>-rw-r--r--</span>
          <span style={{ color: colors.base05 }}> 1 user user </span>
          <span style={{ color: colors.base09 }}>220</span>
          <span style={{ color: colors.base05 }}> Jan 01 12:00 </span>
          <span style={{ color: colors.base03 }}>.bash_logout</span>
        </div>
        <div>
          <span style={{ color: colors.base05 }}>-rw-r--r--</span>
          <span style={{ color: colors.base05 }}> 1 user user </span>
          <span style={{ color: colors.base09 }}>3526</span>
          <span style={{ color: colors.base05 }}> Jan 01 12:00 </span>
          <span style={{ color: colors.base03 }}>.bashrc</span>
        </div>
        <div>
          <span style={{ color: colors.base0D }}>drwxr-xr-x</span>
          <span style={{ color: colors.base05 }}> 3 user user </span>
          <span style={{ color: colors.base09 }}>4096</span>
          <span style={{ color: colors.base05 }}> Jan 14 15:22 </span>
          <span style={{ color: colors.base0D, fontWeight: 'bold' }}>.config</span>
        </div>
        <div>
          <span style={{ color: colors.base05 }}>-rw-r--r--</span>
          <span style={{ color: colors.base05 }}> 1 user user </span>
          <span style={{ color: colors.base09 }}>1024</span>
          <span style={{ color: colors.base05 }}> Jan 15 09:45 </span>
          <span style={{ color: colors.base05 }}>document.txt</span>
        </div>
        <div>
          <span style={{ color: colors.base0B }}>-rwxr-xr-x</span>
          <span style={{ color: colors.base05 }}> 1 user user </span>
          <span style={{ color: colors.base09 }}>8192</span>
          <span style={{ color: colors.base05 }}> Jan 14 18:30 </span>
          <span style={{ color: colors.base0B, fontWeight: 'bold' }}>my-script.sh</span>
        </div>
        <div>
          <span style={{ color: colors.base05 }}>-rw-r--r--</span>
          <span style={{ color: colors.base05 }}> 1 user user </span>
          <span style={{ color: colors.base09 }}>2048</span>
          <span style={{ color: colors.base05 }}> Jan 13 14:20 </span>
          <span style={{ color: colors.base05 }}>notes.md</span>
        </div>
        <div>
          <span style={{ color: colors.base0D }}>drwxr-xr-x</span>
          <span style={{ color: colors.base05 }}> 5 user user </span>
          <span style={{ color: colors.base09 }}>4096</span>
          <span style={{ color: colors.base05 }}> Jan 15 10:15 </span>
          <span style={{ color: colors.base0D, fontWeight: 'bold' }}>projects</span>
        </div>
        <div>
          <span style={{ color: colors.base08 }}>-rw-r--r--</span>
          <span style={{ color: colors.base05 }}> 1 user user </span>
          <span style={{ color: colors.base09 }}>0</span>
          <span style={{ color: colors.base05 }}> Jan 15 10:30 </span>
          <span style={{ color: colors.base08 }}>error.log</span>
        </div>
      </div>

      <div className="mt-4">
        <span style={{ color: colors.base0B }}>user@hostname</span>
        <span style={{ color: colors.base05 }}>:</span>
        <span style={{ color: colors.base0D }}>~</span>
        <span style={{ color: colors.base05 }}>$ </span>
        <span className="animate-pulse">_</span>
      </div>
    </div>
  );
}
