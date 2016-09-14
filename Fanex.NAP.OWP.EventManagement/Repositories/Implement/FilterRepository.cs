namespace Fanex.NAP.OWP.EventManagement.Repositories.Implement
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Core.Helpers;
    using Data;
    using Data.Repository;
    using Enumerations;
    using global::OWP.Constants;
    using Interfaces;
    using Model;
    using Models.EventInfo;
    using ViewModels.Filter;
    using League = Models.EventInfo.League;

    public class FilterRepository : IFilterRepository
    {
        public CreatingFilterViewModel GetFilterDetail(ICriteria criteria)
        {
            using (var db = ObjectDbFactory.CreateInstance(criteria.GetSettingKey()))
            {
                using (var reader = db.QueryMultiple(criteria))
                {
                    var info = reader.Read<FilterModel>();
                    var detail = reader.Read<FieldDetail>();
                    var conditions = reader.Read<FilterFieldModel>();
                    var leagues = reader.Read<League>();
                    var assignees = reader.Read<Employee>();
                    var tivies = reader.Read<Television>();
                    var agents = reader.Read<Agent>();
                    var providers = reader.Read<Provider>();
                    var otherProviders = reader.Read<OtherProvider>();
                    var refResource = reader.Read<FilterRefResource>();

                    var result = new CreatingFilterViewModel
                    {
                        Filter = info.FirstOrDefault(),
                        Conditions = conditions,
                        AddedField = GetAddedFields(detail, conditions, leagues, assignees, tivies, agents, providers, otherProviders, refResource)
                    };

                    return result;
                }
            }
        }

        private IEnumerable<AddConditionControlViewModel> GetAddedFields(
            IEnumerable<FieldDetail> detail,
            IEnumerable<FilterFieldModel> conditions,
            IEnumerable<League> leagues,
            IEnumerable<Employee> assignees,
            IEnumerable<Television> tivies,
            IEnumerable<Agent> agents,
            IEnumerable<Provider> providers,
            IEnumerable<OtherProvider> otherProviders,
            IEnumerable<FilterRefResource> refResource)
        {
            var addedFields = new List<AddConditionControlViewModel>();
            var fieldsHasValue = conditions.Where(x => x.IsHasValue);

            foreach (var field in fieldsHasValue)
            {
                var fieldDetail = detail.Where(x => x.FieldId == field.FieldId);

                if (fieldDetail.Any())
                {
                    var fieldId = field.FieldId;
                    var fieldValue = fieldDetail.FirstOrDefault().Value;
                    var model = new AddConditionControlViewModel
                    {
                        FieldId = field.FieldId,
                        EventDate = GetSelectedEventDate(fieldId, fieldValue),
                        RangeValue = GetRangeValue(fieldId, fieldDetail)
                    };

                    switch (fieldId)
                    {
                        case (int)FilterFieldType.League:
                            model.Leagues = leagues;
                            break;

                        case (int)FilterFieldType.Assignee:
                            model.Assignees = assignees;
                            break;

                        case (int)FilterFieldType.TV:
                            model.Tivies = tivies;
                            break;

                        case (int)FilterFieldType.OtherProvider:
                            model.OtherProviders = otherProviders;
                            break;

                        case (int)FilterFieldType.Provider:
                            model.Providers = providers;
                            break;

                        case (int)FilterFieldType.Agent:
                            model.Agents = agents;
                            break;

                        case (int)FilterFieldType.MatchStatus:
                            model.MatchStatus = refResource.Where(x => x.RefName == ReferenceResourceNames.MatchStatus);
                            break;

                        default:
                            model.Value = fieldValue;
                            break;
                    }

                    addedFields.Add(model);
                }
            }

            return addedFields;
        }

        private static RangeEventDate GetSelectedEventDate(int fieldId, string value)
        {
            RangeEventDate result = null;

            if (fieldId == (int)FilterFieldType.EventDate)
            {
                result = new RangeEventDate();
                var today = DateTime.Now;

                switch (value)
                {
                    case "0":
                        result.DateValue = today.ToOWPDateFormat();
                        result.SelectedOption = 0;
                        break;

                    case "1":
                        result.DateValue = today.AddDays(1).ToOWPDateFormat();
                        result.SelectedOption = 1;
                        break;

                    case "2":
                        result.DateValue = today.AddDays(-1).ToOWPDateFormat();
                        result.SelectedOption = 2;
                        break;

                    default:
                        result.DateValue = value;
                        result.SelectedOption = 3;
                        break;
                }
            }

            return result;
        }

        private static RangeValue GetRangeValue(int fieldId, IEnumerable<FieldDetail> fieldDetail)
        {
            var rangeValue = new RangeValue();
            switch (fieldId)
            {
                case (int)FilterFieldType.KOTime:
                    rangeValue.Small = fieldDetail.FirstOrDefault(x => x.Operator == (int)FilterOperation.MoreThanAndEqual).Value;
                    rangeValue.Big = fieldDetail.FirstOrDefault(x => x.Operator == (int)FilterOperation.LessThanAndEqual).Value;
                    break;

                case (int)FilterFieldType.MaxBet:
                    var smallValue = fieldDetail.FirstOrDefault(x => x.Operator == (int)FilterOperation.MoreThanAndEqual).Value;
                    var bigValue = fieldDetail.FirstOrDefault(x => x.Operator == (int)FilterOperation.LessThanAndEqual).Value;
                    rangeValue.Small = (int.Parse(smallValue) / 1000).ToString();
                    rangeValue.Big = (int.Parse(bigValue) / 1000).ToString();
                    break;

                case (int)FilterFieldType.Spread:
                    var smallSpread = fieldDetail.FirstOrDefault(x => x.Operator == (int)FilterOperation.MoreThanAndEqual).Value;
                    var bigSpread = fieldDetail.FirstOrDefault(x => x.Operator == (int)FilterOperation.LessThanAndEqual).Value;
                    rangeValue.Small = (float.Parse(smallSpread) * 100).ToString("0.0");
                    rangeValue.Big = (float.Parse(bigSpread) * 100).ToString("0.0");
                    break;

                default:
                    rangeValue = null;
                    break;
            }

            return rangeValue;
        }
    }
}