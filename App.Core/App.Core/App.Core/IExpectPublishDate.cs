﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core
{
    public interface IExpectPublishDate
    {
        IExpectPublisher SetPublishDate(DateTime PublishDate);
    }
}