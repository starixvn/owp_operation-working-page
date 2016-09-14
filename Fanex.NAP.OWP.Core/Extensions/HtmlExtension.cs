namespace Fanex.NAP.OWP.Core.Extensions
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Web.Mvc;
    using System.Web.Routing;

    public static class HtmlExtension
    {
        #region MaterializeCheckBox

        public static MvcHtmlString MaterializeCheckBox(
            this HtmlHelper htmlHelper,
            string name,
            string label)
        {
            return MaterializeCheckBox(htmlHelper, name, label, false);
        }

        public static MvcHtmlString MaterializeCheckBox(
            this HtmlHelper htmlHelper,
            string name,
            string labelText,
            bool isChecked)
        {
            var fullHtmlFieldName = htmlHelper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(name);

            if (string.IsNullOrEmpty(fullHtmlFieldName))
            {
                throw new ArgumentException("name cannot be null or empty.", nameof(name));
            }

            var checkbox = new TagBuilder("input");
            checkbox.MergeAttribute("id", fullHtmlFieldName);
            checkbox.MergeAttribute("name", fullHtmlFieldName);
            checkbox.MergeAttribute("type", HtmlHelper.GetInputTypeString(InputType.CheckBox));
            checkbox.MergeAttribute("value", "true");
            if (isChecked)
            {
                checkbox.MergeAttribute("checked", "checked");
            }

            var label = new TagBuilder("label");
            label.InnerHtml = labelText;
            label.MergeAttribute("for", fullHtmlFieldName);

            var hidden = new TagBuilder("input");
            hidden.MergeAttribute("name", fullHtmlFieldName);
            hidden.MergeAttribute("type", HtmlHelper.GetInputTypeString(InputType.Hidden));
            hidden.MergeAttribute("value", "false");

            return MvcHtmlString.Create(checkbox.ToString(TagRenderMode.SelfClosing) + label + hidden.ToString(TagRenderMode.SelfClosing));
        }

        public static MvcHtmlString MaterializeCheckBox(
            this HtmlHelper htmlHelper,
            string name,
            string labelText,
            object htmlAttributes)
        {
            return MaterializeCheckBox(htmlHelper, name, labelText, HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes));
        }

        public static MvcHtmlString MaterializeCheckBox(
            this HtmlHelper htmlHelper,
            string name,
            string labelText,
            IDictionary<string, object> htmlAttributes)
        {
            var fullHtmlFieldName = htmlHelper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(name);

            if (string.IsNullOrEmpty(fullHtmlFieldName))
            {
                throw new ArgumentException("name cannot be null or empty.", nameof(name));
            }

            var checkbox = new TagBuilder("input");
            checkbox.MergeAttribute("id", fullHtmlFieldName);
            checkbox.MergeAttribute("name", fullHtmlFieldName);
            checkbox.MergeAttribute("type", HtmlHelper.GetInputTypeString(InputType.CheckBox));
            checkbox.MergeAttribute("value", "true");

            IDictionary<string, object> htmlAttrs = htmlAttributes == null ? new RouteValueDictionary() : new RouteValueDictionary(htmlAttributes);
            checkbox.MergeAttributes(htmlAttrs);

            var label = new TagBuilder("label");
            label.InnerHtml = labelText;
            label.MergeAttribute("for", fullHtmlFieldName);

            var hidden = new TagBuilder("input");
            hidden.MergeAttribute("name", fullHtmlFieldName);
            hidden.MergeAttribute("type", HtmlHelper.GetInputTypeString(InputType.Hidden));
            hidden.MergeAttribute("value", "false");

            return MvcHtmlString.Create(checkbox.ToString(TagRenderMode.SelfClosing) + label + hidden.ToString(TagRenderMode.SelfClosing));
        }

        public static MvcHtmlString MaterializeCheckBox(
            this HtmlHelper htmlHelper,
            string name,
            string labelText,
            bool isChecked,
            object htmlAttributes)
        {
            return MaterializeCheckBox(htmlHelper, name, labelText, isChecked, HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes));
        }

        public static MvcHtmlString MaterializeCheckBox(
            this HtmlHelper htmlHelper,
            string name,
            string labelText,
            bool isChecked,
            IDictionary<string, object> htmlAttributes)
        {
            var fullHtmlFieldName = htmlHelper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(name);

            if (string.IsNullOrEmpty(fullHtmlFieldName))
            {
                throw new ArgumentException("name cannot be null or empty.", nameof(name));
            }

            var checkbox = new TagBuilder("input");
            checkbox.MergeAttribute("id", fullHtmlFieldName);
            checkbox.MergeAttribute("name", fullHtmlFieldName);
            checkbox.MergeAttribute("type", HtmlHelper.GetInputTypeString(InputType.CheckBox));
            checkbox.MergeAttribute("value", "true");
            if (isChecked)
            {
                checkbox.MergeAttribute("checked", "checked");
            }

            IDictionary<string, object> htmlAttrs = htmlAttributes == null ? new RouteValueDictionary() : new RouteValueDictionary(htmlAttributes);
            checkbox.MergeAttributes(htmlAttrs);

            var label = new TagBuilder("label");
            label.InnerHtml = labelText;
            label.MergeAttribute("for", fullHtmlFieldName);

            var hidden = new TagBuilder("input");
            hidden.MergeAttribute("name", fullHtmlFieldName);
            hidden.MergeAttribute("type", HtmlHelper.GetInputTypeString(InputType.Hidden));
            hidden.MergeAttribute("value", "false");

            return MvcHtmlString.Create(checkbox.ToString(TagRenderMode.SelfClosing) + label + hidden.ToString(TagRenderMode.SelfClosing));
        }

        #endregion MaterializeCheckBox

        public static MvcHtmlString MaterializeSwitches(
            this HtmlHelper htmlHelper,
            string name)
        {
            return MaterializeSwitches(htmlHelper, name, false);
        }

        public static MvcHtmlString MaterializeSwitches(
            this HtmlHelper htmlHelper,
            string name,
            bool isChecked)
        {
            var fullHtmlFieldName = htmlHelper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(name);

            if (string.IsNullOrEmpty(fullHtmlFieldName))
            {
                throw new ArgumentException("name cannot be null or empty.", nameof(name));
            }

            var checkbox = new TagBuilder("input");
            checkbox.MergeAttribute("id", fullHtmlFieldName);
            checkbox.MergeAttribute("name", fullHtmlFieldName);
            checkbox.MergeAttribute("type", HtmlHelper.GetInputTypeString(InputType.CheckBox));
            checkbox.MergeAttribute("value", "true");
            if (isChecked)
            {
                checkbox.MergeAttribute("checked", "checked");
            }

            var label = new TagBuilder("span");
            label.MergeAttribute("class", "lever");

            var hidden = new TagBuilder("input");
            hidden.MergeAttribute("name", fullHtmlFieldName);
            hidden.MergeAttribute("type", HtmlHelper.GetInputTypeString(InputType.Hidden));
            hidden.MergeAttribute("value", "false");

            return MvcHtmlString.Create(checkbox.ToString(TagRenderMode.SelfClosing) + label + hidden.ToString(TagRenderMode.SelfClosing));
        }

        public static MvcHtmlString MaterializeSwitches(
            this HtmlHelper htmlHelper,
            string name,
            object htmlAttributes)
        {
            return MaterializeSwitches(htmlHelper, name, HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes));
        }

        public static MvcHtmlString MaterializeSwitches(
            this HtmlHelper htmlHelper,
            string name,
            IDictionary<string, object> htmlAttributes)
        {
            var fullHtmlFieldName = htmlHelper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(name);

            if (string.IsNullOrEmpty(fullHtmlFieldName))
            {
                throw new ArgumentException("name cannot be null or empty.", nameof(name));
            }

            var checkbox = new TagBuilder("input");
            checkbox.MergeAttribute("id", fullHtmlFieldName);
            checkbox.MergeAttribute("name", fullHtmlFieldName);
            checkbox.MergeAttribute("type", HtmlHelper.GetInputTypeString(InputType.CheckBox));
            checkbox.MergeAttribute("value", "true");

            IDictionary<string, object> htmlAttrs = htmlAttributes == null ? new RouteValueDictionary() : new RouteValueDictionary(htmlAttributes);
            checkbox.MergeAttributes(htmlAttrs);

            var label = new TagBuilder("span");
            label.MergeAttribute("class", "lever");

            var hidden = new TagBuilder("input");
            hidden.MergeAttribute("name", fullHtmlFieldName);
            hidden.MergeAttribute("type", HtmlHelper.GetInputTypeString(InputType.Hidden));
            hidden.MergeAttribute("value", "false");

            return MvcHtmlString.Create(checkbox.ToString(TagRenderMode.SelfClosing) + label + hidden.ToString(TagRenderMode.SelfClosing));
        }

        public static MvcHtmlString MaterializeSwitches(
            this HtmlHelper htmlHelper,
            string name,
            bool isChecked,
            object htmlAttributes)
        {
            return MaterializeSwitches(htmlHelper, name, isChecked, HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes));
        }

        public static MvcHtmlString MaterializeSwitches(
            this HtmlHelper htmlHelper,
            string name,
            bool isChecked,
            IDictionary<string, object> htmlAttributes)
        {
            var fullHtmlFieldName = htmlHelper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(name);

            if (string.IsNullOrEmpty(fullHtmlFieldName))
            {
                throw new ArgumentException("name cannot be null or empty.", nameof(name));
            }

            var checkbox = new TagBuilder("input");
            checkbox.MergeAttribute("id", fullHtmlFieldName);
            checkbox.MergeAttribute("name", fullHtmlFieldName);
            checkbox.MergeAttribute("type", HtmlHelper.GetInputTypeString(InputType.CheckBox));
            checkbox.MergeAttribute("value", "true");
            if (isChecked)
            {
                checkbox.MergeAttribute("checked", "checked");
            }

            IDictionary<string, object> htmlAttrs = htmlAttributes == null ? new RouteValueDictionary() : new RouteValueDictionary(htmlAttributes);
            checkbox.MergeAttributes(htmlAttrs);

            var label = new TagBuilder("span");
            label.MergeAttribute("class", "lever");

            var hidden = new TagBuilder("input");
            hidden.MergeAttribute("name", fullHtmlFieldName);
            hidden.MergeAttribute("type", HtmlHelper.GetInputTypeString(InputType.Hidden));
            hidden.MergeAttribute("value", "false");

            return MvcHtmlString.Create(checkbox.ToString(TagRenderMode.SelfClosing) + label + hidden.ToString(TagRenderMode.SelfClosing));
        }

        public static MvcHtmlString MaterializeSwitchesFor<TModel>(
            this HtmlHelper<TModel> htmlHelper,
            Expression<Func<TModel, bool>> expression)
        {
            return MaterializeSwitchesFor(htmlHelper, expression, null);
        }

        public static MvcHtmlString MaterializeSwitchesFor<TModel>(
            this HtmlHelper<TModel> htmlHelper,
            Expression<Func<TModel, bool>> expression,
            object htmlAttributes)
        {
            return MaterializeSwitchesFor(htmlHelper, expression, HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes));
        }

        public static MvcHtmlString MaterializeSwitchesFor<TModel>(
            this HtmlHelper<TModel> htmlHelper,
            Expression<Func<TModel, bool>> expression,
            IDictionary<string, object> htmlAttributes)
        {
            var modelMetadata = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData);
            var propertyName = expression.Body.ToString().Split('.').Last();

            var checkbox = new TagBuilder("input");
            checkbox.MergeAttribute("id", propertyName);
            checkbox.MergeAttribute("name", propertyName);
            checkbox.MergeAttribute("type", HtmlHelper.GetInputTypeString(InputType.CheckBox));
            checkbox.MergeAttribute("value", "true");
            if (modelMetadata.Model != null && (bool)modelMetadata.Model)
            {
                checkbox.MergeAttribute("checked", "checked");
            }

            IDictionary<string, object> htmlAttrs = htmlAttributes == null ? new RouteValueDictionary() : new RouteValueDictionary(htmlAttributes);
            checkbox.MergeAttributes(htmlAttrs);

            var label = new TagBuilder("span");
            label.MergeAttribute("class", "lever");

            var hidden = new TagBuilder("input");
            hidden.MergeAttribute("name", propertyName);
            hidden.MergeAttribute("type", HtmlHelper.GetInputTypeString(InputType.Hidden));
            hidden.MergeAttribute("value", "false");

            return MvcHtmlString.Create(checkbox.ToString(TagRenderMode.SelfClosing) + label + hidden.ToString(TagRenderMode.SelfClosing));
        }
    }
}