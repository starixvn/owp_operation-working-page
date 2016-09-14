namespace OWP.EventAssignment.User
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Web.Attribute;
    using OWP.Constants;

    [RoutePrefix("api/event-assignment/user")]
    public class UserController : ApiController
    {
        private readonly Repository repository;

        public UserController(Repository repository)
        {
            this.repository = repository;
        }

        [Route("")]
        [HttpGet]
        [NapAuth(FunctionKey = FunctionKeys.DetailsInformation, Policy = Constant.Policy.Read)]
        public async Task<IEnumerable<UserInfo>> Query(DateTime eventDate)
        {
            return await repository.Query(eventDate);
        }
    }
}