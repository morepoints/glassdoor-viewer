const isGlassdoor = host => /(^|\.)glassdoor\./i.test(host);

if (!isGlassdoor(location.hostname)) {}

else {

(function persistentCleanup() {
  const cleanOverlayAndBody = () => {
    const body = document.body;
    if (!body) return;

    const overlay = document.getElementById("HardsellOverlay");
    if (overlay) {
      overlay.remove();
    }

    if (body.style) {
      if (body.style.overflow === "hidden") {
        body.style.overflow = "";
      }

      if (body.style.position === "fixed") {
        body.style.position = "";
      }
    }
  };

  const initialInterval = setInterval(() => {
    cleanOverlayAndBody();
    if (document.body) {
      clearInterval(initialInterval);
    }
  }, 100);

  const globalObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) {
          if (node.nodeName === "BODY" || node.querySelector?.("#HardsellOverlay")) {
            cleanOverlayAndBody();
          }
        }
      }
    }
  });

  globalObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  const observeBodyStyles = () => {
    if (!document.body) return;

    const bodyObserver = new MutationObserver(() => {
      cleanOverlayAndBody();
    });

    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"]
    });
  };

  const waitForBody = setInterval(() => {
    if (document.body) {
      observeBodyStyles();
      clearInterval(waitForBody);
    }
  }, 100);
})();
}
