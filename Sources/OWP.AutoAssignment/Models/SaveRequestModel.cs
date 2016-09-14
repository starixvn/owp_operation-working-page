namespace OWP.AutoAssignment.Models
{
    public class SaveRequestModel
    {
        public string RequestId { get; set; }

        public int Code { get; set; }

        public AssignmentResult[] Data { get; set; }
    }
}