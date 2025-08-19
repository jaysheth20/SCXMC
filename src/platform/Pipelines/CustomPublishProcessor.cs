using Sitecore.Diagnostics;
using Sitecore.Pipelines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XmCloudSXAStarter.Pipelines
{
    public class CustomPublishProcessor
    {
        public void Process(PipelineArgs args)
        {
            Log.Info("✅ CustomPublishPipeline executed successfully!", this);

           
        }
    }
}