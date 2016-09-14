namespace OWP.MVC
{
    using System.Web;
    using System.Web.Optimization;

    public class CssVirtualPathRewriteUrlTransform : IItemTransform
    {
        public string Process(string includedVirtualPath, string input)
        {
            return new CssRewriteUrlTransform().Process("~" + VirtualPathUtility.ToAbsolute(includedVirtualPath), input);
        }
    }
}
