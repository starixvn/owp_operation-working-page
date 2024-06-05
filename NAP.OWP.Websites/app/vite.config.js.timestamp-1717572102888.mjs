// vite.config.js
import { defineConfig } from "file:///D:/work/operation-working-page/NAP.OWP.Websites/app/node_modules/vite/dist/node/index.js";
import react from "file:///D:/work/operation-working-page/NAP.OWP.Websites/app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { createHtmlPlugin } from "file:///D:/work/operation-working-page/NAP.OWP.Websites/app/node_modules/vite-plugin-html/dist/index.mjs";
import copy from "file:///D:/work/operation-working-page/NAP.OWP.Websites/app/node_modules/rollup-plugin-copy/dist/index.commonjs.js";
import { resolve } from "path";
var __vite_injected_original_dirname = "D:\\work\\operation-working-page\\NAP.OWP.Websites\\app";
var appName = process.env.NODE_APP.trim();
var outDir = resolve(__vite_injected_original_dirname, `../wwwroot/${appName}`);
var nerCoreUrl = "http://localhost:5000";
var netFwUrl = "http://localhost:64193";
var webSocket = "ws://localhost:5000";
var vite_config_default = defineConfig({
  base: process.env.NODE_ENV === "production" ? `/wwwroot/${appName}` : "/",
  server: {
    open: true,
    host: true,
    proxy: {
      "/otherSportNewDataUploadNotifyHub": {
        target: webSocket,
        ws: true,
        secure: false
      },
      "/changedInfoNotifyHub": {
        target: webSocket,
        ws: true,
        secure: false
      },
      "/ticketCenterNotifyHub": {
        target: webSocket,
        ws: true,
        secure: false
      },
      "/preMatchNotifyHub": {
        target: webSocket,
        ws: true,
        secure: false
      },
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3b3JrXFxcXG9wZXJhdGlvbi13b3JraW5nLXBhZ2VcXFxcTkFQLk9XUC5XZWJzaXRlc1xcXFxhcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHdvcmtcXFxcb3BlcmF0aW9uLXdvcmtpbmctcGFnZVxcXFxOQVAuT1dQLldlYnNpdGVzXFxcXGFwcFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovd29yay9vcGVyYXRpb24td29ya2luZy1wYWdlL05BUC5PV1AuV2Vic2l0ZXMvYXBwL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1odG1sJztcclxuaW1wb3J0IGNvcHkgZnJvbSAncm9sbHVwLXBsdWdpbi1jb3B5JztcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xyXG5cclxuY29uc3QgYXBwTmFtZSA9IHByb2Nlc3MuZW52Lk5PREVfQVBQLnRyaW0oKTtcclxuY29uc3Qgb3V0RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIGAuLi93d3dyb290LyR7YXBwTmFtZX1gKTtcclxuY29uc3QgbmVyQ29yZVVybCA9ICdodHRwOi8vbG9jYWxob3N0OjUwMDAnO1xyXG5jb25zdCBuZXRGd1VybCA9ICdodHRwOi8vbG9jYWxob3N0OjY0MTkzJztcclxuY29uc3Qgd2ViU29ja2V0ID0gJ3dzOi8vbG9jYWxob3N0OjUwMDAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBiYXNlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nID8gYC93d3dyb290LyR7YXBwTmFtZX1gIDogJy8nLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgb3BlbjogdHJ1ZSxcclxuICAgIGhvc3Q6IHRydWUsXHJcbiAgICBwcm94eToge1xyXG4gICAgICAnL290aGVyU3BvcnROZXdEYXRhVXBsb2FkTm90aWZ5SHViJzoge1xyXG4gICAgICAgIHRhcmdldDogd2ViU29ja2V0LFxyXG4gICAgICAgIHdzOiB0cnVlLFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgJy9jaGFuZ2VkSW5mb05vdGlmeUh1Yic6IHtcclxuICAgICAgICB0YXJnZXQ6IHdlYlNvY2tldCxcclxuICAgICAgICB3czogdHJ1ZSxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgICcvdGlja2V0Q2VudGVyTm90aWZ5SHViJzoge1xyXG4gICAgICAgIHRhcmdldDogd2ViU29ja2V0LFxyXG4gICAgICAgIHdzOiB0cnVlLFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgJy9wcmVNYXRjaE5vdGlmeUh1Yic6IHtcclxuICAgICAgICB0YXJnZXQ6IHdlYlNvY2tldCxcclxuICAgICAgICB3czogdHJ1ZSxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgICcvYXBpLW5ldGNvcmUnOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBuZXJDb3JlVXJsLFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLW5ldGNvcmUvLCAnYXBpJylcclxuICAgICAgfSxcclxuICAgICAgJy9UaWNrZXRzJzoge1xyXG4gICAgICAgIHRhcmdldDogbmVyQ29yZVVybCxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICAnL25ldC1jb3JlLXN0YXRlLWFwaSc6IHtcclxuICAgICAgICB0YXJnZXQ6IG5lckNvcmVVcmwsXHJcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UoL15cXC9uZXQtY29yZS1zdGF0ZS1hcGkvLCAnc3RhdGUtYXBpJylcclxuICAgICAgfSxcclxuICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBuZXRGd1VybCxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICAnL3NpZ25hbHInOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBuZXRGd1VybCxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICAnL1NjcmlwdHMnOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBuZXRGd1VybCxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICAnL0NvbnRlbnQnOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBuZXRGd1VybCxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICAnL2ZvbnRzJzoge1xyXG4gICAgICAgIHRhcmdldDogbmV0RndVcmwsXHJcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWVcclxuICAgICAgfSxcclxuICAgICAgJy9zdGF0ZS1hcGknOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBuZXRGd1VybCxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICAnL1Rhc2tTY2hlZHVsaW5nJzoge1xyXG4gICAgICAgIHRhcmdldDogbmV0RndVcmwsXHJcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWVcclxuICAgICAgfSxcclxuICAgICAgJy93d3dyb290Jzoge1xyXG4gICAgICAgIHRhcmdldDogbmV0RndVcmwsXHJcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWVcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBvcnQ6IDMwMDBcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBjcmVhdGVIdG1sUGx1Z2luKHtcclxuICAgICAgbWluaWZ5OiBmYWxzZSxcclxuICAgICAgZW50cnk6IGBzcmMvYXBwcy8ke2FwcE5hbWV9LmpzeGBcclxuICAgIH0pLFxyXG4gICAgY29weSh7XHJcbiAgICAgIHRhcmdldHM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzcmM6IGAuLi93d3dyb290LyR7YXBwTmFtZX0vc2VydmVyLmh0bWxgLFxyXG4gICAgICAgICAgZGVzdDogb3V0RGlyLFxyXG4gICAgICAgICAgcmVuYW1lOiAnc2VydmVyLmNzaHRtbCcsXHJcbiAgICAgICAgICB0cmFuc2Zvcm06IGNvbnRlbnQgPT5cclxuICAgICAgICAgICAgY29udGVudC50b1N0cmluZygpLnJlcGxhY2UoL1xcL3d3d3Jvb3QvZywgJ3d3d3Jvb3QnKVxyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuICAgICAgaG9vazogJ2Nsb3NlQnVuZGxlJ1xyXG4gICAgfSlcclxuICBdLFxyXG4gIGRlZmluZToge1xyXG4gICAgZ2xvYmFsOiAnd2luZG93J1xyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcixcclxuICAgIHNvdXJjZW1hcDogZmFsc2UsXHJcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgaW5wdXQ6IHtcclxuICAgICAgICBtYWluOiAnc2VydmVyLmh0bWwnXHJcbiAgICAgIH0sXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnYXNzZXRzL2V4dC9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdJyxcclxuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcclxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcclxuICAgICAgICBuYW1lOiAnTXlCdW5kbGUnXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGV4cGVyaW1lbnRhbDoge1xyXG4gICAgcmVuZGVyQnVpbHRVcmwoZmlsZW5hbWUsIHsgaG9zdFR5cGUgfSkge1xyXG4gICAgICBpZiAoaG9zdFR5cGUgPT09ICdqcycpIHtcclxuICAgICAgICByZXR1cm4gYHd3d3Jvb3QvJHthcHBOYW1lfS9gICsgZmlsZW5hbWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGhvc3RUeXBlID09PSAnY3NzJykge1xyXG4gICAgICAgIGNvbnN0IGZpbGUgPSBmaWxlbmFtZS5yZXBsYWNlKCdhc3NldHMvZXh0JywgJycpO1xyXG4gICAgICAgIHJldHVybiAnLicgKyBmaWxlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnfnJlYWN0LWJvb3RzdHJhcC1tdWx0aXNlbGVjdCc6IHJlc29sdmUoXHJcbiAgICAgICAgX19kaXJuYW1lLFxyXG4gICAgICAgICdub2RlX21vZHVsZXMvcmVhY3QtYm9vdHN0cmFwLW11bHRpc2VsZWN0J1xyXG4gICAgICApLFxyXG4gICAgICAnfnN3ZWV0YWxlcnQyJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdub2RlX21vZHVsZXMvc3dlZXRhbGVydDInKSxcclxuICAgICAgJ35yZWFjdC10b2FzdGlmeSc6IHJlc29sdmUoX19kaXJuYW1lLCAnbm9kZV9tb2R1bGVzL3JlYWN0LXRvYXN0aWZ5JyksXHJcbiAgICAgICd+cmVhY3QtdGFibGUnOiByZXNvbHZlKF9fZGlybmFtZSwgJ25vZGVfbW9kdWxlcy9yZWFjdC10YWJsZScpLFxyXG4gICAgICAnfnJlYWN0LWRhdGVwaWNrZXInOiByZXNvbHZlKF9fZGlybmFtZSwgJ25vZGVfbW9kdWxlcy9yZWFjdC1kYXRlcGlja2VyJyksXHJcbiAgICAgICd+Zml4ZWQtZGF0YS10YWJsZS0yJzogcmVzb2x2ZShcclxuICAgICAgICBfX2Rpcm5hbWUsXHJcbiAgICAgICAgJ25vZGVfbW9kdWxlcy9maXhlZC1kYXRhLXRhYmxlLTInXHJcbiAgICAgIClcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFWLFNBQVMsb0JBQW9CO0FBQ2xYLE9BQU8sV0FBVztBQUNsQixTQUFTLHdCQUF3QjtBQUNqQyxPQUFPLFVBQVU7QUFDakIsU0FBUyxlQUFlO0FBSnhCLElBQU0sbUNBQW1DO0FBTXpDLElBQU0sVUFBVSxRQUFRLElBQUksU0FBUyxLQUFLO0FBQzFDLElBQU0sU0FBUyxRQUFRLGtDQUFXLGNBQWMsU0FBUztBQUN6RCxJQUFNLGFBQWE7QUFDbkIsSUFBTSxXQUFXO0FBQ2pCLElBQU0sWUFBWTtBQUVsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNLFFBQVEsSUFBSSxhQUFhLGVBQWUsWUFBWSxZQUFZO0FBQUEsRUFDdEUsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wscUNBQXFDO0FB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
