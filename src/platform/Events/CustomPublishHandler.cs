using Sitecore.Diagnostics;
using Sitecore.Pipelines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XmCloudSXAStarter.Events
{
    public class CustomPublishHandler
    {
        public void OnPublishEnd(object sender, EventArgs args)
        {
            Log.Info("🚀 Publish:end event triggered!", this);

            // Run the custom pipeline
            CorePipeline.Run("customPublishPipeline", new PipelineArgs());
            Log.Info("✅ [CustomPublishHandler] Custom pipeline executed successfully.", this);

        }
    }
}