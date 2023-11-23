namespace OWP.AutoAssignment
{
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Models;
    using OWP.Models;
    using Services;

    [AllowAnonymous]
    [RoutePrefix("api/public/auto-assignment")]
    public class ApiServicePublicController : ApiController
    {
        private readonly SaveRequestService saveRequestService;
        private readonly GetRequestService getRequestService;

        public ApiServicePublicController(
            SaveRequestService saveRequestService,
            GetRequestService getRequestService)
        {
            this.getRequestService = getRequestService;
            this.saveRequestService = saveRequestService;
        }

        [HttpGet]
        [Route("get-new")]
        public new async Task<IEnumerable<RequestSender>> Request()
        {
            var sender = await getRequestService.GetNewRequestSender();
            return sender;
        }

        [HttpPost]
        [Route("save-request")]
        public async Task<ResultDataObject> SaveRequest(HttpRequestMessage request)
           => await saveRequestService.Save(request);
    }
}