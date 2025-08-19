using Sitecore.Diagnostics;
using Sitecore.Shell.Framework.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XmCloudSXAStarter.Commands
{
    public class ClearCacheCommand : Command
    {
        public override void Execute(CommandContext context)
        {
            // Example: Clear Sitecore cache
            Sitecore.Caching.CacheManager.ClearAllCaches();
            Sitecore.Context.ClientPage.ClientResponse.Alert("All caches cleared!");
            Log.Info("Clear Cache", this);

        }

    }
}