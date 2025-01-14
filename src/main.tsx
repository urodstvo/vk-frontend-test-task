import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot,
  Panel,
  SplitCol,
  SplitLayout,
  View,
} from "@vkontakte/vkui";
import { FilterProvider, Filter } from "@/components/filter";
import { ResultList } from "@/components/result";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@vkontakte/vkui/dist/vkui.css";
// import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <AdaptivityProvider>
          <AppRoot>
            <SplitLayout>
              <SplitCol autoSpaced>
                <View activePanel="main">
                  <Panel id="main">
                    <FilterProvider>
                      <Filter />
                      <ResultList />
                    </FilterProvider>
                  </Panel>
                </View>
              </SplitCol>
            </SplitLayout>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>
);
