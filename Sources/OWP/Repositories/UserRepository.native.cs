namespace OWP.Repositories
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Criteria;
    using Fanex.Data.Repository;
    using Models;

    public interface UserRepository
    {
        Task<User> GetUserInfoById(int userId);

        Task<IList<User>> GetAllUsers();
    }

    public class UserRepositoryImp : UserRepository
    {
        private readonly IDynamicRepository repository;

        public UserRepositoryImp(IDynamicRepository repository)
        {
            this.repository = repository;
        }

        public async Task<User> GetUserInfoById(int userId)
        {
            var criteria = new GetUserInfoByIdCriteria
            {
                UserId = userId
            };
            return await repository.GetAsync<User>(criteria);
        }

        public async Task<IList<User>> GetAllUsers()
        {
            var criteria = new GetAllUserCriteria();
            return (await repository.FetchAsync<User>(criteria)).ToList();
        }
    }
}
