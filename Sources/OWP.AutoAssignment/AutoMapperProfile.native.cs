namespace OWP.AutoAssignment
{
    using AutoMapper;
    using Models;
    using Visualization.Models;
    using assignModel = Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<assignModel.HandicapAssignmentModel, HandicapAssignmentModel>();
            CreateMap<assignModel.Handicap1stAssignmentModel, Handicap1stAssignmentModel>();
            CreateMap<assignModel.OverUnderAssignmentModel, OverUnderAssignmentModel>();
            CreateMap<assignModel.OverUnder1stAssignmentModel, OverUnder1stAssignmentModel>();
            CreateMap<assignModel.OneXTwoAssignmentModel, OneXTwoAssignmentModel>();
            CreateMap<assignModel.OneXTwo1stAssignmentModel, OneXTwo1stAssignmentModel>();
            CreateMap<assignModel.SpecificXMinsAssignmentModel, SpecificXMinsAssignmentModel>();
            CreateMap<assignModel.Specific15MinsAssignmentModel, Specific15MinsAssignmentModel>();
            CreateMap<assignModel.Specific10MinsAssignmentModel, Specific10MinsAssignmentModel>();
            CreateMap<assignModel.LA2ndAssignmentModel, LASerializeModel>();
            CreateMap<assignModel.FMAssignmentModel, FMAssignmentModel>();
            CreateMap<assignModel.AIOAssignmentModel, AIOAssignmentModel>();
            CreateMap<AutoAssigneeModel, AutoTraderModel>();
        }
    }
}