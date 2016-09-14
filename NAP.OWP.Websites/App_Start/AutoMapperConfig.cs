namespace NAP.OWP.Websites
{
    using AutoMapper;
    using global::OWP.Application;

    public static class AutoMapperConfig
    {
        public static IMapper Initialize()
        {
            var configuration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<AutoMapperProfile>();
                cfg.AddProfile<global::OWP.WorkingShift.AutoMapperProfile>();
                cfg.AddProfile<global::OWP.WorkingShift.AutoMapperProfile>();
                cfg.AddProfile<global::OWP.MessageManagement.AutoMapperProfile>();
                cfg.AddProfile<global::OWP.AutoAssignment.AutoMapperProfile>();
                cfg.AddProfile<global::OWP.OddsCompiler.AutoMapperProfile>();
                cfg.AddProfile<global::Fanex.NAP.OWP.TaskScheduling.AutoMapperProfile>();
            });
            return new Mapper(configuration);
        }
    }
}