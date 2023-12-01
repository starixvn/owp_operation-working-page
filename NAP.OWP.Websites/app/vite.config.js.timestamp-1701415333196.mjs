// vite.config.js
import { defineConfig } from "file:///C:/OWP/operation-working-page/NAP.OWP.Websites/app/node_modules/vite/dist/node/index.js";
import react from "file:///C:/OWP/operation-working-page/NAP.OWP.Websites/app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { createHtmlPlugin } from "file:///C:/OWP/operation-working-page/NAP.OWP.Websites/app/node_modules/vite-plugin-html/dist/index.mjs";
import copy from "file:///C:/OWP/operation-working-page/NAP.OWP.Websites/app/node_modules/rollup-plugin-copy/dist/index.commonjs.js";
import { resolve } from "path";
var __vite_injected_original_dirname = "C:\\OWP\\operation-working-page\\NAP.OWP.Websites\\app";
var appName = process.env.NODE_APP.trim();
var outDir = resolve(__vite_injected_original_dirname, `../wwwroot/${appName}`);
var nerCoreUrl = "http://localhost:5000";
var netFwUrl = "http://localhost:64193";
var vite_config_default = defineConfig({
  base: process.env.NODE_ENV === "production" ? `/wwwroot/${appName}` : "/",
  server: {
    open: true,
    host: true,
    proxy: {
      "/api-netcore": {
        target: nerCoreUrl,
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-netcore/, "api")
      },
      "/Tickets": {
        target: nerCoreUrl,
        secure: false,
        changeOrigin: true
      },
      "/net-core-state-api": {
        target: nerCoreUrl,
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/net-core-state-api/, "state-api")
      },
      "/api": {
        target: netFwUrl,
        secure: false,
        changeOrigin: true
      },
      "/signalr": {
        target: netFwUrl,
        secure: false,
        changeOrigin: true
      },
      "/Scripts": {
        target: netFwUrl,
        secure: false,
        changeOrigin: true
      },
      "/Content": {
        target: netFwUrl,
        secure: false,
        changeOrigin: true
      },
      "/fonts": {
        target: netFwUrl,
        secure: false,
        changeOrigin: true
      },
      "/state-api": {
        target: netFwUrl,
        secure: false,
        changeOrigin: true
      },
      "/TaskScheduling": {
        target: netFwUrl,
        secure: false,
        changeOrigin: true
      },
      "/wwwroot": {
        target: netFwUrl,
        secure: false,
        changeOrigin: true
      }
    },
    port: 3e3
  },
  plugins: [
    react(),
    createHtmlPlugin({
      minify: false,
      entry: `src/apps/${appName}.jsx`
    }),
    copy({
      targets: [
        {
          src: `../wwwroot/${appName}/server.html`,
          dest: outDir,
          rename: "server.cshtml",
          transform: (content) => content.toString().replace(/\/wwwroot/g, "wwwroot")
        }
      ],
      hook: "closeBundle"
    })
  ],
  define: {
    global: "window"
  },
  build: {
    outDir,
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "server.html"
      },
      output: {
        assetFileNames: "assets/ext/[name]-[hash][extname]",
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        name: "MyBundle"
      }
    }
  },
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === "js") {
        return `wwwroot/${appName}/` + filename;
      }
      if (hostType === "css") {
        const file = filename.replace("assets/ext", "");
        return "." + file;
      }
    }
  },
  resolve: {
    alias: {
      "~react-bootstrap-multiselect": resolve(
        __vite_injected_original_dirname,
        "node_modules/react-bootstrap-multiselect"
      ),
      "~sweetalert2": resolve(__vite_injected_original_dirname, "node_modules/sweetalert2"),
      "~react-toastify": resolve(__vite_injected_original_dirname, "node_modules/react-toastify"),
      "~react-table": resolve(__vite_injected_original_dirname, "node_modules/react-table"),
      "~react-datepicker": resolve(__vite_injected_original_dirname, "node_modules/react-datepicker"),
      "~fixed-data-table-2": resolve(
        __vite_injected_original_dirname,
        "node_modules/fixed-data-table-2"
      )
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxPV1BcXFxcb3BlcmF0aW9uLXdvcmtpbmctcGFnZVxcXFxOQVAuT1dQLldlYnNpdGVzXFxcXGFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcT1dQXFxcXG9wZXJhdGlvbi13b3JraW5nLXBhZ2VcXFxcTkFQLk9XUC5XZWJzaXRlc1xcXFxhcHBcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L09XUC9vcGVyYXRpb24td29ya2luZy1wYWdlL05BUC5PV1AuV2Vic2l0ZXMvYXBwL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1odG1sJztcclxuaW1wb3J0IGNvcHkgZnJvbSAncm9sbHVwLXBsdWdpbi1jb3B5JztcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xyXG5cclxuY29uc3QgYXBwTmFtZSA9IHByb2Nlc3MuZW52Lk5PREVfQVBQLnRyaW0oKTtcclxuY29uc3Qgb3V0RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIGAuLi93d3dyb290LyR7YXBwTmFtZX1gKTtcclxuY29uc3QgbmVyQ29yZVVybCA9ICdodHRwOi8vbG9jYWxob3N0OjUwMDAnO1xyXG5jb25zdCBuZXRGd1VybCA9ICdodHRwOi8vbG9jYWxob3N0OjY0MTkzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgYmFzZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyA/IGAvd3d3cm9vdC8ke2FwcE5hbWV9YCA6ICcvJyxcclxuICBzZXJ2ZXI6IHtcclxuICAgIG9wZW46IHRydWUsXHJcbiAgICBob3N0OiB0cnVlLFxyXG4gICAgcHJveHk6IHtcclxuICAgICAgJy9hcGktbmV0Y29yZSc6IHtcclxuICAgICAgICB0YXJnZXQ6IG5lckNvcmVVcmwsXHJcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGktbmV0Y29yZS8sICdhcGknKVxyXG4gICAgICB9LFxyXG4gICAgICAnL1RpY2tldHMnOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBuZXJDb3JlVXJsLFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgICcvbmV0LWNvcmUtc3RhdGUtYXBpJzoge1xyXG4gICAgICAgIHRhcmdldDogbmVyQ29yZVVybCxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZSgvXlxcL25ldC1jb3JlLXN0YXRlLWFwaS8sICdzdGF0ZS1hcGknKVxyXG4gICAgICB9LFxyXG4gICAgICAnL2FwaSc6IHtcclxuICAgICAgICB0YXJnZXQ6IG5ldEZ3VXJsLFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgICcvc2lnbmFscic6IHtcclxuICAgICAgICB0YXJnZXQ6IG5ldEZ3VXJsLFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgICcvU2NyaXB0cyc6IHtcclxuICAgICAgICB0YXJnZXQ6IG5ldEZ3VXJsLFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgICcvQ29udGVudCc6IHtcclxuICAgICAgICB0YXJnZXQ6IG5ldEZ3VXJsLFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgICcvZm9udHMnOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBuZXRGd1VybCxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICAnL3N0YXRlLWFwaSc6IHtcclxuICAgICAgICB0YXJnZXQ6IG5ldEZ3VXJsLFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgICcvVGFza1NjaGVkdWxpbmcnOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBuZXRGd1VybCxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICAnL3d3d3Jvb3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBuZXRGd1VybCxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcG9ydDogMzAwMFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIGNyZWF0ZUh0bWxQbHVnaW4oe1xyXG4gICAgICBtaW5pZnk6IGZhbHNlLFxyXG4gICAgICBlbnRyeTogYHNyYy9hcHBzLyR7YXBwTmFtZX0uanN4YFxyXG4gICAgfSksXHJcbiAgICBjb3B5KHtcclxuICAgICAgdGFyZ2V0czogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNyYzogYC4uL3d3d3Jvb3QvJHthcHBOYW1lfS9zZXJ2ZXIuaHRtbGAsXHJcbiAgICAgICAgICBkZXN0OiBvdXREaXIsXHJcbiAgICAgICAgICByZW5hbWU6ICdzZXJ2ZXIuY3NodG1sJyxcclxuICAgICAgICAgIHRyYW5zZm9ybTogY29udGVudCA9PlxyXG4gICAgICAgICAgICBjb250ZW50LnRvU3RyaW5nKCkucmVwbGFjZSgvXFwvd3d3cm9vdC9nLCAnd3d3cm9vdCcpXHJcbiAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgICBob29rOiAnY2xvc2VCdW5kbGUnXHJcbiAgICB9KVxyXG4gIF0sXHJcbiAgZGVmaW5lOiB7XHJcbiAgICBnbG9iYWw6ICd3aW5kb3cnXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyLFxyXG4gICAgc291cmNlbWFwOiBmYWxzZSxcclxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBpbnB1dDoge1xyXG4gICAgICAgIG1haW46ICdzZXJ2ZXIuaHRtbCdcclxuICAgICAgfSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdhc3NldHMvZXh0L1tuYW1lXS1baGFzaF1bZXh0bmFtZV0nLFxyXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanMnLFxyXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanMnLFxyXG4gICAgICAgIG5hbWU6ICdNeUJ1bmRsZSdcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZXhwZXJpbWVudGFsOiB7XHJcbiAgICByZW5kZXJCdWlsdFVybChmaWxlbmFtZSwgeyBob3N0VHlwZSB9KSB7XHJcbiAgICAgIGlmIChob3N0VHlwZSA9PT0gJ2pzJykge1xyXG4gICAgICAgIHJldHVybiBgd3d3cm9vdC8ke2FwcE5hbWV9L2AgKyBmaWxlbmFtZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaG9zdFR5cGUgPT09ICdjc3MnKSB7XHJcbiAgICAgICAgY29uc3QgZmlsZSA9IGZpbGVuYW1lLnJlcGxhY2UoJ2Fzc2V0cy9leHQnLCAnJyk7XHJcbiAgICAgICAgcmV0dXJuICcuJyArIGZpbGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICd+cmVhY3QtYm9vdHN0cmFwLW11bHRpc2VsZWN0JzogcmVzb2x2ZShcclxuICAgICAgICBfX2Rpcm5hbWUsXHJcbiAgICAgICAgJ25vZGVfbW9kdWxlcy9yZWFjdC1ib290c3RyYXAtbXVsdGlzZWxlY3QnXHJcbiAgICAgICksXHJcbiAgICAgICd+c3dlZXRhbGVydDInOiByZXNvbHZlKF9fZGlybmFtZSwgJ25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0MicpLFxyXG4gICAgICAnfnJlYWN0LXRvYXN0aWZ5JzogcmVzb2x2ZShfX2Rpcm5hbWUsICdub2RlX21vZHVsZXMvcmVhY3QtdG9hc3RpZnknKSxcclxuICAgICAgJ35yZWFjdC10YWJsZSc6IHJlc29sdmUoX19kaXJuYW1lLCAnbm9kZV9tb2R1bGVzL3JlYWN0LXRhYmxlJyksXHJcbiAgICAgICd+cmVhY3QtZGF0ZXBpY2tlcic6IHJlc29sdmUoX19kaXJuYW1lLCAnbm9kZV9tb2R1bGVzL3JlYWN0LWRhdGVwaWNrZXInKSxcclxuICAgICAgJ35maXhlZC1kYXRhLXRhYmxlLTInOiByZXNvbHZlKFxyXG4gICAgICAgIF9fZGlybmFtZSxcclxuICAgICAgICAnbm9kZV9tb2R1bGVzL2ZpeGVkLWRhdGEtdGFibGUtMidcclxuICAgICAgKVxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1YsU0FBUyxvQkFBb0I7QUFDL1cs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
