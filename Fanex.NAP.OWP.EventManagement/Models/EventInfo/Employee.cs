namespace Fanex.NAP.OWP.EventManagement.Models.EventInfo
{
    public class Employee
    {
        public int UserId { get; set; }

        public string Username { get; set; }

        public string Nickname { get; set; }

        public string DisplayName => $"{Username} ({Nickname})";
    }
}