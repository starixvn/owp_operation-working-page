namespace OWP.Application.Header
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Constants;
    using Fanex.NAP.Core.Models;
    using Fanex.NAP.Core.Web.Session;

    public interface Service
    {
        Task<Header> Query();
    }

    public class ServiceImp : Service
    {
        private readonly ICurrentSession session;

        public ServiceImp(ICurrentSession session)
        {
            this.session = session;
        }

        public Task<Header> Query()
        {
            var sessionMenus = session.MenuItemList ?? new List<MenuItem>();
            var menus = GetMenus(sessionMenus);
            var header = new Header
            {
                Username = session.Username,
                LogoutPath = "/Auth/LogOut",
                NotificationSetingPath = "/UserProfile/NotificationSetting",
                AccountSettingPath = "/UserProfile/AccountSetting",
                Menus = menus
            };
            return Task.FromResult(header);
        }

        private List<Menu> GetMenus(IList<MenuItem> menus)
        {
            return menus.Where(m => m.ParentId == 0)
                .OrderBy(m => m.DisplayOrder)
                .Select(m => new Menu
                {
                    Id = m.Id,
                    Name = m.Name,
                    Path = m.Url,
                    IconCssClass = MenuItemExtensions.GetIconCssClass(m.Name),
                    Children = GetChildrenMenus(menus, m.Id)
                })
                .ToList();
        }

        private List<Menu> GetChildrenMenus(IEnumerable<MenuItem> menus, int parentMenuId)
        {
            return menus.Where(x => x.ParentId == parentMenuId)
                .OrderBy(m => m.DisplayOrder)
                .Select(m => new Menu
                {
                    Id = m.Id,
                    Name = m.Name,
                    Path = m.Url,
                    IconCssClass = MenuItemExtensions.GetIconCssClass(m.Name)
                })
                .ToList();
        }
    }
}