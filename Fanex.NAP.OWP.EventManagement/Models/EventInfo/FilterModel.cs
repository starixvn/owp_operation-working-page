namespace Fanex.NAP.OWP.EventManagement.Models.EventInfo
{
    public class FilterModel
    {
        public int FilterId { get; set; }

        public string Name { get; set; }

        public bool IsDefault { get; set; }

        public bool IsPublic { get; set; }

        public bool IsOwner { get; set; }
    }
}