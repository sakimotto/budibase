import { BaseAPIClient } from "./types"
import { AnalyticsEnabledResponse, AnalyticsPingRequest } from "@budibase/types"

export interface AnalyticsEndpoints {
  getAnalyticsStatus: () => Promise<AnalyticsEnabledResponse>
  analyticsPing: (
    payload: Omit<AnalyticsPingRequest, "timezone">
  ) => Promise<void>
}

export const buildAnalyticsEndpoints = (
  API: BaseAPIClient
): AnalyticsEndpoints => ({
  /**
   * Gets the current status of analytics for this environment
   */
  getAnalyticsStatus: async () => {
    return await API.get({
      url: "/api/bbtel",
    })
  },

  /**
   * Notifies analytics of a certain environment
   */
  analyticsPing: async request => {
    return await API.post<AnalyticsPingRequest>({
      url: "/api/bbtel/ping",
      body: {
        ...request,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      parseResponse: () => undefined,
    })
  },
})
