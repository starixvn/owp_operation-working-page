namespace Fanex.NAP.OWP.TaskScheduling.Service.Interfaces
{
    using System;
    using System.IO;
    using System.Threading.Tasks;
    using Models.EventAssignment;

    public interface IEventAssignmentService
    {
        Task DownloadAssignment(DownLoadExportModel model, FileStream file);

        Task<AssignmentUploadHistoryModel> GetLastUpdated(DateTime eventDate);
    }
}