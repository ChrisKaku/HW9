/**
 * Math 102A 課程數位知識庫 - 前端核心腳本
 * 符合 agent.md 規範：Reader-First、三欄結構、原子化筆記渲染、KaTeX 數學支援
 */

// 課程筆記全域清單（對應 source/ 資料夾講義與 docs/ 目錄結構）
const COURSE_CATALOG = [
  {
    slug: "docs/index.md",
    title: "知識庫首頁與學習地圖",
    category: "導覽",
    badge: "Home",
    isHome: true
  },
  {
    categoryTitle: "微積分積分應用 (Applications of Integration)",
    categorySlug: "calculus-integration",
    icon: "∫",
    items: [
      {
        slug: "docs/calculus-integration/_index.md",
        title: "單元導覽：微積分積分應用",
        section: "6.0",
        category: "微積分積分應用"
      },
      {
        slug: "docs/calculus-integration/areas-under-curves.md",
        title: "6.1 曲線間面積與切片法 (Areas Under Curves)",
        section: "6.1",
        category: "微積分積分應用",
        tags: ["面積", "切片法", "垂直切片", "水平切片"]
      },
      {
        slug: "docs/calculus-integration/disk-washer-method.md",
        title: "6.2 旋轉體體積：圓盤與圓環法 (Discs & Washers)",
        section: "6.2",
        category: "微積分積分應用",
        tags: ["旋轉體", "圓盤法", "圓環法", "體積"]
      },
      {
        slug: "docs/calculus-integration/cylindrical-shells.md",
        title: "6.3 旋轉體體積：柱殼法 (Cylindrical Shells)",
        section: "6.3",
        category: "微積分積分應用",
        tags: ["柱殼法", "旋轉體", "體積"]
      }
    ]
  },
  {
    categoryTitle: "空間幾何與向量 (Vectors & Space Geometry)",
    categorySlug: "spatial-geometry-vectors",
    icon: "∇",
    items: [
      {
        slug: "docs/spatial-geometry-vectors/_index.md",
        title: "單元導覽：空間幾何與向量",
        section: "12.0",
        category: "空間幾何與向量"
      },
      {
        slug: "docs/spatial-geometry-vectors/coordinate-systems-3d.md",
        title: "12.1 三維直角坐標系與基本曲面 (3D Coordinates)",
        section: "12.1",
        category: "空間幾何與向量",
        tags: ["坐標系", "右手定則", "球面", "圓柱面"]
      },
      {
        slug: "docs/spatial-geometry-vectors/vectors-basics.md",
        title: "12.2 空間向量與分量表示 (Vectors)",
        section: "12.2",
        category: "空間幾何與向量",
        tags: ["向量", "分量", "模長", "單位向量"]
      },
      {
        slug: "docs/spatial-geometry-vectors/dot-product.md",
        title: "12.3 向量內積與正交投影 (Dot Product)",
        section: "12.3",
        category: "空間幾何與向量",
        tags: ["內積", "夾角", "正交", "投影"]
      },
      {
        slug: "docs/spatial-geometry-vectors/cross-product.md",
        title: "12.4 向量外積與行列式應用 (Cross Product)",
        section: "12.4",
        category: "空間幾何與向量",
        tags: ["外積", "三階行列式", "面積", "扭矩"]
      },
      {
        slug: "docs/spatial-geometry-vectors/lines-and-planes.md",
        title: "12.5 空間直線與平面方程式 (Lines & Planes)",
        section: "12.5",
        category: "空間幾何與向量",
        tags: ["直線方程式", "平面法向量", "歪斜線"]
      }
    ]
  },
  {
    categoryTitle: "規範與範本 (Templates)",
    categorySlug: "_templates",
    icon: "✎",
    items: [
      {
        slug: "docs/_templates/note-template.md",
        title: "原子化筆記標準範本 (Template)",
        section: "Rule",
        category: "規範與範本"
      }
    ]
  }
];

// 本地備份資料字典（確保直接用 file:// 瀏覽器開啟時即使受 CORS 限制也能順暢演示）
const EMBEDDED_NOTES_STORE = (typeof window !== "undefined" && window.EMBEDDED_NOTES_STORE) ? window.EMBEDDED_NOTES_STORE : {};

class KnowledgeApp {
  constructor() {
    this.currentSlug = "docs/index.md";
    this.headings = [];
    this.initElements();
    this.initTheme();
    this.renderSidebarTree();
    this.bindEvents();
    this.handleRouting();

    // 若 KaTeX 稍微延遲載入完成，自動為當前頁面重新渲染公式
    if (typeof katex === "undefined") {
      const checkKatex = setInterval(() => {
        if (typeof katex !== "undefined") {
          clearInterval(checkKatex);
          if (this.currentSlug) {
            this.loadNote(this.currentSlug);
          }
        }
      }, 200);
      setTimeout(() => clearInterval(checkKatex), 6000);
    }
  }

  initElements() {
    this.treeNav = document.getElementById("tree-nav");
    this.contentBody = document.getElementById("content-body");
    this.breadcrumbsEl = document.getElementById("breadcrumbs");
    this.noteMetaEl = document.getElementById("note-meta");
    this.tocList = document.getElementById("toc-list");
    this.prereqPills = document.getElementById("prereq-pills");
    this.relatedPills = document.getElementById("related-pills");
    this.pageFooterNav = document.getElementById("page-footer-nav");
    this.themeToggleBtn = document.getElementById("theme-toggle");
    this.searchModal = document.getElementById("search-modal");
    this.searchDialogInput = document.getElementById("search-dialog-input");
    this.searchResultsList = document.getElementById("search-results-list");
    this.sidebarEl = document.getElementById("app-sidebar");
    this.sidebarBackdrop = document.getElementById("sidebar-backdrop");
    this.mobileMenuBtn = document.getElementById("mobile-menu-btn");
    this.readingProgress = document.getElementById("reading-progress");
  }

  // 主題切換 (深色 / 淺色模式)
  initTheme() {
    const savedTheme = localStorage.getItem("math102a_theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const activeTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    this.setTheme(activeTheme);
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("math102a_theme", theme);
    const isDark = theme === "dark";
    if (this.themeToggleBtn) {
      this.themeToggleBtn.innerHTML = isDark
        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> 淺色`
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> 深色`;
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    this.setTheme(currentTheme === "dark" ? "light" : "dark");
  }

  // 渲染左側邊欄樹狀目錄
  renderSidebarTree() {
    let html = "";

    COURSE_CATALOG.forEach(group => {
      if (group.isHome) {
        html += `
          <li class="tree-item">
            <a href="#${group.slug}" class="tree-item-link ${this.currentSlug === group.slug ? "active" : ""}" data-slug="${group.slug}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              <span>${group.title}</span>
            </a>
          </li>
        `;
      } else {
        html += `
          <li class="tree-group" data-group="${group.categorySlug}">
            <div class="tree-group-header">
              <span class="group-title">
                <span style="font-family: serif; font-size: 1.1em; color: var(--accent-primary);">${group.icon}</span>
                <span>${group.categoryTitle.split(" (")[0]}</span>
              </span>
              <span class="chevron">▼</span>
            </div>
            <ul class="tree-subitems">
        `;

        group.items.forEach(item => {
          const isActive = this.currentSlug === item.slug;
          html += `
            <li class="tree-item">
              <a href="#${item.slug}" class="tree-item-link ${isActive ? "active" : ""}" data-slug="${item.slug}">
                <span>${item.title}</span>
                <span class="tree-item-badge">${item.section}</span>
              </a>
            </li>
          `;
        });

        html += `
            </ul>
          </li>
        `;
      }
    });

    this.treeNav.innerHTML = html;
  }

  // 解析 Frontmatter 與 Markdown
  parseFrontmatter(markdownText) {
    let frontmatter = {};
    let content = markdownText;

    const match = markdownText.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if (match) {
      const rawYaml = match[1];
      content = markdownText.slice(match[0].length);

      rawYaml.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) return;

        const colonIdx = trimmed.indexOf(":");
        if (colonIdx !== -1) {
          const key = trimmed.slice(0, colonIdx).trim();
          let val = trimmed.slice(colonIdx + 1).trim();

          // Array 解析 [a, b]
          if (val.startsWith("[") && val.endsWith("]")) {
            val = val.slice(1, -1).split(",").map(s => s.trim().replace(/^['"]|['"]$/g, ""));
          } else {
            val = val.replace(/^['"]|['"]$/g, "");
          }
          frontmatter[key] = val;
        }
      });
    }

    return { frontmatter, content };
  }

  // 安全渲染數學公式 (保護 LaTeX 避免被 Markdown 解析器轉義破壞)
  renderMarkdownWithKaTeX(markdownRaw) {
    const mathTokens = [];
    let text = markdownRaw;

    // 1. 保護獨立區塊公式 $$ ... $$ (使用純英數 Token 避免 Markdown 解析器視為強調語法)
    text = text.replace(/\$\$([\s\S]*?)\$\$/g, (m, latex) => {
      const id = `KTXBLOCK${mathTokens.length}TOKEN`;
      mathTokens.push({ id, latex: latex.trim(), display: true });
      return `\n\n${id}\n\n`;
    });

    // 2. 保護行內公式 $ ... $
    text = text.replace(/\$([^\$\n\r]+?)\$/g, (m, latex) => {
      const id = `KTXINLINE${mathTokens.length}TOKEN`;
      mathTokens.push({ id, latex: latex.trim(), display: false });
      return id;
    });

    // 3. 用 Marked 解析 Markdown 為 HTML
    marked.setOptions({
      gfm: true,
      breaks: false,
      headerIds: true,
      mangle: false
    });
    let html = marked.parse(text);

    // 4. 將數學佔位符替換為 KaTeX 渲染 HTML
    mathTokens.forEach(token => {
      let katexHtml = "";
      try {
        if (typeof katex !== "undefined") {
          katexHtml = katex.renderToString(token.latex, {
            displayMode: token.display,
            throwOnError: false
          });
        } else {
          katexHtml = token.display ? `<div class="katex-fallback">$$${token.latex}$$</div>` : `<span class="katex-fallback">$${token.latex}$</span>`;
        }
      } catch (e) {
        katexHtml = `<span style="color:red">[Math error: ${token.latex}]</span>`;
      }

      if (token.display) {
        const pRegex = new RegExp(`<p>\\s*${token.id}\\s*<\\/p>`, "g");
        html = html.replace(pRegex, () => `<div class="katex-display-wrapper">${katexHtml}</div>`);
      }
      // 使用函式回傳值替換，避免 LaTeX 內包含之 $ 符號被 JS replace 誤認為特殊變數 ($1, $& 等)
      html = html.replace(new RegExp(token.id, "g"), () => katexHtml);
    });

    return html;
  }

  // 載入與渲染特定筆記檔案
  async loadNote(rawSlug) {
    const slug = (rawSlug || "docs/index.md").replace(/\\/g, "/");
    this.currentSlug = slug;
    this.updateActiveSidebarLink();
    this.contentBody.innerHTML = `<div style="text-align:center; padding: 4rem; color: var(--text-muted);">正在載入知識點筆記...</div>`;

    let markdown = "";
    const store = (typeof window !== "undefined" && window.EMBEDDED_NOTES_STORE) ? window.EMBEDDED_NOTES_STORE : EMBEDDED_NOTES_STORE;
    const getFromStore = (k) => {
      if (!store) return null;
      return store[k] || store[k.replace(/\//g, "\\")] || store[k.replace(/\\/g, "/")];
    };

    if (window.location.protocol === "file:") {
      markdown = getFromStore(slug);
    } else {
      try {
        const res = await fetch(slug);
        if (res.ok) {
          markdown = await res.text();
        } else {
          throw new Error(`HTTP ${res.status}`);
        }
      } catch (e) {
        markdown = getFromStore(slug);
      }
    }

    if (!markdown) {
      markdown = getFromStore(slug) || `# 載入提示\n\n目前檢視檔案：\`${slug}\`\n\n> 本檔案尚在整理中，已在 \`docs/\` 目錄規劃架構，可隨時依據 \`agent.md\` 規範填入知識點。`;
    }

    const { frontmatter, content } = this.parseFrontmatter(markdown);
    this.renderNoteMeta(frontmatter, slug);
    this.renderContent(content, frontmatter);
    this.buildTOC();
    this.renderRelations(frontmatter);
    this.renderPageFooterNav(slug);

    // 滾動回頂端
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // 渲染麵包屑與元資料卡
  renderNoteMeta(fm, slug) {
    const parts = slug.replace(/^docs\//, "").split("/");
    let breadcrumbHtml = `<a href="#docs/index.md">知識庫</a>`;

    if (parts.length > 1) {
      const categoryName = fm.category || parts[0];
      breadcrumbHtml += ` <span class="separator">/</span> <a href="#docs/${parts[0]}/_index.md">${categoryName}</a>`;
    }
    const pageTitle = fm.title || parts[parts.length - 1];
    breadcrumbHtml += ` <span class="separator">/</span> <span>${pageTitle}</span>`;
    this.breadcrumbsEl.innerHTML = breadcrumbHtml;

    // 計算預估閱讀時間 (中文約每分鐘 300~400 字)
    const wordCount = (fm.title || "").length + 500;
    const readMin = Math.max(3, Math.min(6, Math.ceil(wordCount / 300)));

    let metaHtml = "";
    if (fm.category) {
      metaHtml += `<span class="meta-category">${fm.category}</span>`;
    }
    if (fm.tags && Array.isArray(fm.tags)) {
      metaHtml += `<div class="meta-tags">${fm.tags.map(t => `<span class="tag-pill">#${t}</span>`).join("")}</div>`;
    }
    if (fm.updated) {
      metaHtml += `<span class="meta-info-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> 更新日期：${fm.updated}</span>`;
    }
    metaHtml += `<span class="meta-info-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 8 14"></polyline></svg> 建議複習：${readMin} 分鐘</span>`;

    this.noteMetaEl.innerHTML = metaHtml;
  }

  // 渲染中央內文
  renderContent(contentMarkdown, fm) {
    const html = this.renderMarkdownWithKaTeX(contentMarkdown);
    this.contentBody.innerHTML = html;

    // 為所有表格包覆 wrapper 支援水平滑動
    this.contentBody.querySelectorAll("table").forEach(tbl => {
      if (!tbl.parentElement.classList.contains("table-wrapper")) {
        const wrapper = document.createElement("div");
        wrapper.className = "table-wrapper";
        tbl.parentNode.insertBefore(wrapper, tbl);
        wrapper.appendChild(tbl);
      }
    });

    // 處理相對連結跳轉
    this.contentBody.querySelectorAll("a").forEach(a => {
      const href = a.getAttribute("href");
      if (href && href.endsWith(".md")) {
        // 解析相對路徑
        const targetSlug = this.resolveRelativeSlug(this.currentSlug, href);
        a.setAttribute("href", `#${targetSlug}`);
        a.addEventListener("click", (e) => {
          e.preventDefault();
          window.location.hash = `#${targetSlug}`;
        });
      }
    });
  }

  // 生成右側目錄 (TOC)
  buildTOC() {
    this.headings = [];
    const elements = this.contentBody.querySelectorAll("h2, h3");

    if (elements.length === 0) {
      this.tocList.innerHTML = `<li style="color:var(--text-muted); font-size:0.8rem;">本頁無分段標題</li>`;
      return;
    }

    let tocHtml = "";
    elements.forEach((heading, idx) => {
      const id = heading.id || `section-heading-${idx}`;
      heading.id = id;
      const text = heading.textContent.replace(/^#+\s*/, "");
      const isH3 = heading.tagName.toLowerCase() === "h3";

      this.headings.push({ id, element: heading });

      tocHtml += `
        <li>
          <a href="#${id}" class="toc-link ${isH3 ? "h3-link" : ""}" data-target="${id}">
            ${text}
          </a>
        </li>
      `;
    });

    this.tocList.innerHTML = tocHtml;

    // 點擊 TOC 錨點平滑滾動
    this.tocList.querySelectorAll(".toc-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("data-target");
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const top = targetEl.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      });
    });
  }

  // 渲染右側關聯知識卡 (Prerequisites & Related)
  renderRelations(fm) {
    // 前置知識
    if (fm.prerequisites && Array.isArray(fm.prerequisites) && fm.prerequisites.length > 0) {
      this.prereqPills.innerHTML = fm.prerequisites.map(p => {
        const slug = this.resolveRelativeSlug(this.currentSlug, p);
        const itemInfo = this.findNoteBySlug(slug);
        const label = itemInfo ? itemInfo.title.split(" (")[0] : p.replace(/^.*\//, "").replace(".md", "");
        return `<a href="#${slug}" class="relation-pill-link">↳ ${label}</a>`;
      }).join("");
    } else {
      this.prereqPills.innerHTML = `<span style="font-size:0.75rem; color:var(--text-muted);">無特定前置需求</span>`;
    }

    // 延伸概念
    if (fm.related && Array.isArray(fm.related) && fm.related.length > 0) {
      this.relatedPills.innerHTML = fm.related.map(r => {
        const slug = this.resolveRelativeSlug(this.currentSlug, r);
        const itemInfo = this.findNoteBySlug(slug);
        const label = itemInfo ? itemInfo.title.split(" (")[0] : r.replace(/^.*\//, "").replace(".md", "");
        return `<a href="#${slug}" class="relation-pill-link">➔ ${label}</a>`;
      }).join("");
    } else {
      this.relatedPills.innerHTML = `<span style="font-size:0.75rem; color:var(--text-muted);">無特定延伸概念</span>`;
    }
  }

  // 底部上一篇 / 下一篇導航
  renderPageFooterNav(currentSlug) {
    const flatList = [];
    COURSE_CATALOG.forEach(group => {
      if (group.isHome) flatList.push(group);
      else if (group.items) flatList.push(...group.items);
    });

    const currentIndex = flatList.findIndex(item => item.slug === currentSlug);
    if (currentIndex === -1) {
      this.pageFooterNav.innerHTML = "";
      return;
    }

    const prevItem = currentIndex > 0 ? flatList[currentIndex - 1] : null;
    const nextItem = currentIndex < flatList.length - 1 ? flatList[currentIndex + 1] : null;

    let navHtml = "";
    if (prevItem) {
      navHtml += `
        <a href="#${prevItem.slug}" class="nav-card">
          <span class="nav-direction">← 上一篇筆記</span>
          <span class="nav-title">${prevItem.title.split(" (")[0]}</span>
        </a>
      `;
    } else {
      navHtml += `<div></div>`;
    }

    if (nextItem) {
      navHtml += `
        <a href="#${nextItem.slug}" class="nav-card" style="text-align: right;">
          <span class="nav-direction">下一篇筆記 →</span>
          <span class="nav-title">${nextItem.title.split(" (")[0]}</span>
        </a>
      `;
    }

    this.pageFooterNav.innerHTML = navHtml;
  }

  // 工具函式：根據當前路徑解析 Markdown 相對路徑
  resolveRelativeSlug(baseSlug, relativePath) {
    if (relativePath.startsWith("/")) {
      return `docs${relativePath}`;
    }
    if (relativePath.startsWith("./")) {
      const baseDir = baseSlug.substring(0, baseSlug.lastIndexOf("/"));
      return `${baseDir}/${relativePath.slice(2)}`;
    }
    if (relativePath.startsWith("../")) {
      const parts = baseSlug.split("/");
      parts.pop(); // remove file
      parts.pop(); // remove parent dir
      return `${parts.join("/")}/${relativePath.slice(3)}`;
    }
    return relativePath;
  }

  findNoteBySlug(slug) {
    for (const group of COURSE_CATALOG) {
      if (group.slug === slug) return group;
      if (group.items) {
        const found = group.items.find(i => i.slug === slug);
        if (found) return found;
      }
    }
    return null;
  }

  updateActiveSidebarLink() {
    this.treeNav.querySelectorAll(".tree-item-link").forEach(link => {
      if (link.getAttribute("data-slug") === this.currentSlug) {
        link.classList.add("active");
        // 自動展開其父目錄群組
        const parentGroup = link.closest(".tree-group");
        if (parentGroup) parentGroup.classList.remove("collapsed");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // 監聽事件
  bindEvents() {
    // 展開 / 收合樹狀目錄
    this.treeNav.addEventListener("click", (e) => {
      const header = e.target.closest(".tree-group-header");
      if (header) {
        const group = header.closest(".tree-group");
        group.classList.toggle("collapsed");
      }
    });

    // 主題按鈕
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener("click", () => this.toggleTheme());
    }

    // 行動裝置選單
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener("click", () => {
        this.sidebarEl.classList.toggle("open");
        this.sidebarBackdrop.classList.toggle("active");
      });
    }

    if (this.sidebarBackdrop) {
      this.sidebarBackdrop.addEventListener("click", () => {
        this.sidebarEl.classList.remove("open");
        this.sidebarBackdrop.classList.remove("active");
      });
    }

    // 鍵盤快捷鍵 (Ctrl+K 開啟全域搜尋)
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        this.openSearch();
      }
      if (e.key === "Escape") {
        this.closeSearch();
      }
    });

    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("focus", () => this.openSearch());
    }

    if (this.searchModal) {
      this.searchModal.addEventListener("click", (e) => {
        if (e.target === this.searchModal) this.closeSearch();
      });
    }

    if (this.searchDialogInput) {
      this.searchDialogInput.addEventListener("input", (e) => this.handleSearch(e.target.value));
    }

    // 滾動監聽：閱讀進度條 + TOC 高亮
    window.addEventListener("scroll", () => {
      this.updateReadingProgress();
      this.updateActiveTocHeading();
    }, { passive: true });

    // Hash 路由變更
    window.addEventListener("hashchange", () => this.handleRouting());
  }

  handleRouting() {
    let hash = window.location.hash.replace(/^#/, "");
    if (!hash) hash = "docs/index.md";
    // 如果是頁面內的錨點（例如 #section-heading-1），則不重新載入頁面
    if (hash.startsWith("section-") || hash.startsWith("heading-")) {
      return;
    }
    this.loadNote(hash);
    if (this.sidebarEl) this.sidebarEl.classList.remove("open");
    if (this.sidebarBackdrop) this.sidebarBackdrop.classList.remove("active");
  }

  updateReadingProgress() {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollTotal > 0) {
      const progress = (window.pageYOffset / scrollTotal) * 100;
      this.readingProgress.style.width = `${progress}%`;
    }
  }

  updateActiveTocHeading() {
    if (!this.headings || this.headings.length === 0) return;
    const scrollPos = window.pageYOffset + 120;
    let activeId = "";

    for (let i = 0; i < this.headings.length; i++) {
      const heading = this.headings[i];
      if (heading.element.offsetTop <= scrollPos) {
        activeId = heading.id;
      } else {
        break;
      }
    }

    this.tocList.querySelectorAll(".toc-link").forEach(link => {
      if (link.getAttribute("data-target") === activeId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // 全域搜尋邏輯
  openSearch() {
    this.searchModal.classList.add("active");
    this.searchDialogInput.value = "";
    this.searchDialogInput.focus();
    this.handleSearch("");
  }

  closeSearch() {
    this.searchModal.classList.remove("active");
  }

  handleSearch(keyword) {
    const q = keyword.trim().toLowerCase();
    const flatList = [];
    COURSE_CATALOG.forEach(group => {
      if (group.isHome) flatList.push(group);
      else if (group.items) flatList.push(...group.items);
    });

    const matches = flatList.filter(item => {
      if (!q) return true;
      const titleMatch = item.title.toLowerCase().includes(q);
      const categoryMatch = (item.category || "").toLowerCase().includes(q);
      const tagMatch = item.tags && item.tags.some(t => t.toLowerCase().includes(q));
      return titleMatch || categoryMatch || tagMatch;
    });

    if (matches.length === 0) {
      this.searchResultsList.innerHTML = `<li style="padding:1.5rem; text-align:center; color:var(--text-muted);">無符合關鍵字的知識筆記</li>`;
      return;
    }

    this.searchResultsList.innerHTML = matches.map(item => `
      <li class="search-result-item" onclick="app.selectSearchResult('${item.slug}')">
        <div class="result-title">${item.title}</div>
        <div class="result-category">${item.category || "知識庫"} ${item.section ? `• [${item.section}]` : ""}</div>
      </li>
    `).join("");
  }

  selectSearchResult(slug) {
    this.closeSearch();
    window.location.hash = `#${slug}`;
  }
}

// 初始化應用
let app = null;
window.addEventListener("DOMContentLoaded", () => {
  app = new KnowledgeApp();
});
