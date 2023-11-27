import { registerApplication, start, navigateToUrl } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import { getDynamicContent, getDynamicMenuInfo } from "./services/config";
import { generateLayout, generateMenu, domParser } from "./utils";

const data = {
  loaders: {
    reactLoader: "<h1>Loading...</h1>",
    nonFrameworkLoader: "<h1>Loading...</h1>",
    brokenServiceLoader: "<h1>Loading...</h1>",
  },
  errors: {
    reactError: "<h1>Failed to load application</h1>",
    nonFrameworkError: "<h1>Failed to load application</h1>",
    brokenServiceError: "<h1>Failed to load application</h1>",
  },
  props: {},
};

const bootstrap = (layout: Element) => {
  const routes = constructRoutes(layout, data);
  const applications = constructApplications({
    routes,
    loadApp: ({ name }) => System.import(name),
  });
  const layoutEngine = constructLayoutEngine({ routes, applications });

  applications.forEach((item) => {
    registerApplication({
      ...item,
      customProps: {
        services: {},
        asEmbeddedSystem: true,
        value: "passed value from host application",
      },
    });
  });
  layoutEngine.activate();

  document.querySelectorAll(".btn").forEach((btn) => {
    const linkUrl = btn.getAttribute("linkUrl");
    btn.addEventListener("click", (e) => {
      linkUrl && navigateToUrl(linkUrl);
    });
  });

  start();
};

Promise.all([getDynamicMenuInfo(), getDynamicContent()]).then(
  ([menu, content]) => {
    const templateString = `<single-spa-router>
    <section id="single-spa-layout">
      <section id="single-spa-sidebar" class="single-spa-sidebar">
        ${generateMenu(menu)}
      </section>
      <section id="single-spa-content">
        <route default loader="yeah">
          <p>This example project shows independently built and deployed microfrontends that use React and single-spa. Each sidebar navigation link loads a different microfrontend.</p>
        </route>
        ${generateLayout(content)}
      </section>
    </section>
</single-spa-router>`;
    bootstrap(
      domParser(templateString).documentElement.querySelector(
        "single-spa-router"
      )
    );
  }
);
