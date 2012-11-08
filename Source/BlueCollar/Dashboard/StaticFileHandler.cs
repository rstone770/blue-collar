﻿//-----------------------------------------------------------------------
// <copyright file="StaticFileHandler.cs" company="Tasty Codes">
//     Copyright (c) 2011 Chad Burggraf.
// </copyright>
//-----------------------------------------------------------------------

namespace BlueCollar.Dashboard
{
    using System;
    using System.IO;
    using System.Web;

    /// <summary>
    /// Basic implementation of <see cref="IDashboardHandler"/> for embedded static files.
    /// </summary>
    public class StaticFileHandler : DashboardHandlerBase
    {
        private string requestedFileName;

        /// <summary>
        /// Initializes a new instance of the StaticFileHandler class.
        /// </summary>
        /// <param name="repositoryFactory">The repository factory to use.</param>
        public StaticFileHandler(IRepositoryFactory repositoryFactory)
            : base(repositoryFactory)
        {
        }

        /// <summary>
        /// Gets the cache modes available for responses generated by this instance.
        /// </summary>
        protected override ResponseCacheModes CacheModes
        {
            get { return ResponseCacheModes.Client | ResponseCacheModes.Server; }
        }

        /// <summary>
        /// Gets the name of the requested static file.
        /// </summary>
        protected virtual string RequestedFileName
        {
            get
            {
                if (this.requestedFileName == null)
                {
                    this.requestedFileName = RouteParameters.Count > 2 && !string.IsNullOrEmpty(RouteParameters[0]) && !string.IsNullOrEmpty(this.RouteParameters[2])
                        ? string.Concat(RouteParameters[0], RouteParameters[2])
                        : HandlerRelativeRequestUrl;
                }

                return this.requestedFileName;
            }
        }

        /// <summary>
        /// Gets the content type of the response this handler generates.
        /// </summary>
        protected override string ResponseContentType
        {
            get { return StaticFile.GetContentType(Path.GetExtension(this.RequestedFileName)); }
        }

        /// <summary>
        /// Creates a <see cref="StaticFile"/> instance corresponding with the current request.
        /// </summary>
        /// <param name="context">The HTTP context to create the file for.</param>
        /// <returns>A <see cref="StaticFile"/> instance.</returns>
        protected virtual StaticFile CreateFile(HttpContextBase context)
        {
            if (context == null)
            {
                throw new ArgumentNullException("context", "context cannot be null.");
            }

            return StaticFile.Create(HandlerUrl, this.RequestedFileName);
        }

        /// <summary>
        /// Performs the concrete request operation and returns the output
        /// as a byte array.
        /// </summary>
        /// <param name="context">The HTTP context to perform the request for.</param>
        /// <returns>The response to write.</returns>
        protected override byte[] PerformRequest(HttpContextBase context)
        {
            try
            {
                return this.PerformRequest(context, this.CreateFile(context));
            }
            catch (FileNotFoundException)
            {
                NotFound();
            }

            return null;
        }

        /// <summary>
        /// Performs the concrete request operation and returns the output as a byte array.
        /// </summary>
        /// <param name="context">The HTTP context to perform the request for.</param>
        /// <param name="file">The static file to return the contents of.</param>
        /// <returns>The response to write.</returns>
        protected virtual byte[] PerformRequest(HttpContextBase context, StaticFile file)
        {
            if (file == null)
            {
                throw new ArgumentNullException("file", "file cannot be null.");
            }

            return file.Contents;
        }
    }
}