namespace OWP.AutoAssignment.Services
{
    using System.Net.Http;
    using System.Threading.Tasks;
    using Models;
    using Newtonsoft.Json;
    using OWP.Models;

    public interface SaveRequestService
    {
        Task<ResultDataObject> Save(HttpRequestMessage request);
    }

    public class SaveRequestServiceImp : SaveRequestService
    {
        private readonly Repository repository;

        public SaveRequestServiceImp(Repository repository)
        {
            this.repository = repository;
        }

        public async Task<ResultDataObject> Save(HttpRequestMessage request)
        {
            var jsonString = await request.Content.ReadAsStringAsync();
            var model = JsonConvert.DeserializeObject<SaveRequestModel>(jsonString);

            if (model == null || model.Data == null)
            {
                return new ResultDataObject
                {
                    Code = 1,
                    Message = "Data not found"
                };
            }

            var result = await repository.SaveRequest(model);

            return result;
        }
    }
}