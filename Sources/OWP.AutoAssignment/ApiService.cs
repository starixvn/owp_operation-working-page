namespace OWP.AutoAssignment
{
    using System.Net.Http;
    using System.Threading.Tasks;
    using Fanex.NAP.OWP.Core.Configuration;
    using Fanex.NAP.OWP.Core.Services;
    using Models;

    public interface ApiService
    {
        Task<string> CreateRequest(DataHolder dataHolder);

        Task<CheckStatusResult> CheckRequest(CheckStatusParam param);
    }

    public class ApiServiceImp : ApiService
    {
        private readonly HttpClient httpClient;

        public ApiServiceImp(IHttpClientFactory httpClientFactory)
        {
            httpClient = httpClientFactory.Create(AppSettings.AutoAssignmentAPI);
        }

        public async Task<string> CreateRequest(DataHolder dataHolder)
        {
            var response = await httpClient.PostAsJsonAsync("SuspenderAssignment/AssignSuspender", dataHolder);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<string>();
        }

        public async Task<CheckStatusResult> CheckRequest(CheckStatusParam param)
        {
            var response = await httpClient.PostAsJsonAsync("SuspenderAssignment/CheckStatus", param);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<CheckStatusResult>();
        }
    }
}