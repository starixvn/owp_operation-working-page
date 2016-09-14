namespace OWP.WorkingShift.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Web.Attribute;
    using Models;
    using OWP.Constants;
    using Repositories;

    [RoutePrefix("api/working-shift-color")]
    public class WorkingShiftColorApiController : ApiController
    {
        private readonly WorkingShiftColorRepository repository;

        public WorkingShiftColorApiController(WorkingShiftColorRepository repository)
        {
            this.repository = repository;
        }

        [Route("get-all")]
        [HttpGet]
        [NapAuth(FunctionKey = FunctionKeys.WorkingShiftManagement, Policy = Constant.Policy.Read)]
        public async Task<IHttpActionResult> GetAll()
        {
            var data = await repository.GetAll();
            return Ok(data);
        }

        [Route("validation-create")]
        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.WorkingShiftManagement_ShiftManagement, Policy = Constant.Policy.Host)]
        public async Task<IHttpActionResult> ValidateBeforeCreate(QuickInsertWorkingShiftColorModel model)
        {
            var result = await repository.ValidateBeforeCreateAsync(model.ShiftCode);
            return Ok(result);
        }

        [Route("")]
        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.WorkingShiftManagement_ShiftManagement, Policy = Constant.Policy.Host)]
        public async Task<IHttpActionResult> Insert(QuickInsertWorkingShiftColorModel model)
        {
            var result = await repository.Insert(model);
            return Ok(result);
        }

        [Route("")]
        [HttpPut]
        [NapAuth(FunctionKey = FunctionKeys.WorkingShiftManagement_ShiftManagement, Policy = Constant.Policy.Host)]
        public async Task<IHttpActionResult> Update(WorkingShiftColorModel model)
        {
            var result = await repository.Update(model);

            return Ok(result);
        }

        [Route("validation-delete")]
        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.WorkingShiftManagement_ShiftManagement, Policy = Constant.Policy.Host)]
        public async Task<IHttpActionResult> ValidateBeforeDelete(WorkingShiftColorModel model)
        {
            var result = await repository.ValidateBeforeDeleteAsync(model.ShiftId);
            return Ok(result);
        }

        [Route("")]
        [HttpDelete]
        [NapAuth(FunctionKey = FunctionKeys.WorkingShiftManagement_ShiftManagement, Policy = Constant.Policy.Host)]
        public async Task<IHttpActionResult> Delete(WorkingShiftColorModel model)
        {
            var result = await repository.Delete(model.ShiftId);

            return Ok(result);
        }

        [Route("get-all-gmt8")]
        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.WorkingShiftManagement, Policy = Constant.Policy.Read)]
        public async Task<IHttpActionResult> GetAllGmt8()
        {
            var data = await repository.GetAllGmt8();
            return Ok(data);
        }

        private async Task<string> InsertWS(string item)
        {
            try
            {
                await repository.Insert(new QuickInsertWorkingShiftColorModel
                {
                    ShiftCode = item.ToUpperInvariant(),
                    Background = "#3399cc",
                    Color = "#FFFFFF"
                });

                return item + "_" + "Ok";
            }
            catch (Exception ex)
            {
                return item + "_" + ex.Message;
            }
        }

        [Route("buck_insert")]
        [HttpPost]
        [NapAuth(FunctionKey = FunctionKeys.WorkingShiftManagement, Policy = Constant.Policy.Read)]
        public async Task<IHttpActionResult> BuckInsertWorkingShift([FromBody]IEnumerable<string> models)
        {
            if (models == null || !models.Any())
            {
                return Ok("Data not found");
            }

            var getAll = await repository.GetAll();

            var list = new List<string>();

            foreach (var item in models)
            {
                var findExist = getAll.FirstOrDefault(x => x.ShiftCode.Equals(item.ToUpperInvariant()));
                if (findExist != null)
                {
                    list.Add(item + " is existed");
                }
                else
                {
                    var result = await repository.ValidateBeforeCreateAsync(item);

                    list.Add(result.Code >= 0 ? await InsertWS(item) : item + " validate_" + result.Code);
                }
            }

            return Ok(list);
        }
    }
}