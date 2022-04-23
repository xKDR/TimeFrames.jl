var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = TSx","category":"page"},{"location":"#TSx","page":"Home","title":"TSx","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for TSx.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [TSx]","category":"page"},{"location":"#TSx.TS","page":"Home","title":"TSx.TS","text":"struct TS\n  coredata :: DataFrame\nend\n\n::TS - A type to hold ordered data with an index.\n\nA TS object is essentially a DataFrame with a specific column marked as an index. The input DataFrame is sorted during construction and is stored under the property coredata. The index is stored in the Index column of coredata.\n\nPermitted data inputs to the constructors are DataFrame, Vector, and 2-dimensional Array. If an index is already not present in the constructor then a sequential integer index is created automatically.\n\nTS(coredata::DataFrame): Here, the constructor looks for a column named Index in coredata as the index column, if this is not found then the first column of coredata is made the index by default. If coredata only has a single column then a new sequential index is generated.\n\nSince TS.coredata is a DataFrame it can be operated upon independently using methods provided by the DataFrames package (ex. transform, combine, etc.).\n\nConstructors\n\nTS(coredata::DataFrame, index::Union{String, Symbol, Int})\nTS(coredata::DataFrame, index::AbstractVector{T}) where {T<:Union{Int, TimeType}}\nTS(coredata::DataFrame)\nTS(coredata::DataFrame, index::UnitRange{Int})\nTS(coredata::AbstractVector{T}, index::AbstractVector{V}) where {T, V}\nTS(coredata::AbstractVector{T}) where {T}\nTS(coredata::AbstractArray{T,2}) where {T}\nTS(coredata::AbstractArray{T,2}, index::AbstractVector{V}) where {T, V}\n\nExamples\n\njulia> using Random;\njulia> random(x) = rand(MersenneTwister(123), x);\n\njulia> df = DataFrame(x1 = random(10))\n10×1 DataFrame\n Row │ x1\n     │ Float64\n─────┼───────────\n   1 │ 0.768448\n   2 │ 0.940515\n   3 │ 0.673959\n   4 │ 0.395453\n   5 │ 0.313244\n   6 │ 0.662555\n   7 │ 0.586022\n   8 │ 0.0521332\n   9 │ 0.26864\n  10 │ 0.108871\n\njulia> ts = TS(df)   # generates index\n(10 x 1) TS with Int64 Index\n\n Index  x1\n Int64  Float64\n──────────────────\n     1  0.768448\n     2  0.940515\n     3  0.673959\n     4  0.395453\n     5  0.313244\n     6  0.662555\n     7  0.586022\n     8  0.0521332\n     9  0.26864\n    10  0.108871\n\n# ts.coredata is a DataFrame\njulia> combine(ts.coredata, :x1 => Statistics.mean, DataFrames.nrow)\n1×2 DataFrame\n Row │ x1_mean  nrow\n     │ Float64  Int64\n─────┼────────────────\n   1 │ 0.49898    418\n\njulia> df = DataFrame(ind = [1, 2, 3], x1 = random(3))\n3×2 DataFrame\n Row │ ind    x1\n     │ Int64  Float64\n─────┼─────────────────\n   1 │     1  0.768448\n   2 │     2  0.940515\n   3 │     3  0.673959\n\njulia> ts = TS(df, 1)        # the first column is index\n(3 x 1) TS with Int64 Index\n\n Index  x1\n Int64  Float64\n─────────────────\n     1  0.768448\n     2  0.940515\n     3  0.673959\n\njulia> df = DataFrame(x1 = random(3), x2 = random(3), Index = [1, 2, 3]);\n3×3 DataFrame\n Row │ x1        x2        Index\n     │ Float64   Float64   Int64\n─────┼───────────────────────────\n   1 │ 0.768448  0.768448      1\n   2 │ 0.940515  0.940515      2\n   3 │ 0.673959  0.673959      3\n\njulia> ts = TS(df)   # uses existing `Index` column\n(3 x 2) TS with Int64 Index\n\n Index  x1        x2\n Int64  Float64   Float64\n───────────────────────────\n     1  0.768448  0.768448\n     2  0.940515  0.940515\n     3  0.673959  0.673959\n\njulia> dates = collect(Date(2017,1,1):Day(1):Date(2017,1,10));\n\njulia> df = DataFrame(dates = dates, x1 = random(10))\n10×2 DataFrame\n Row │ dates       x1\n     │ Date        Float64\n─────┼───────────────────────\n   1 │ 2017-01-01  0.768448\n   2 │ 2017-01-02  0.940515\n   3 │ 2017-01-03  0.673959\n   4 │ 2017-01-04  0.395453\n   5 │ 2017-01-05  0.313244\n   6 │ 2017-01-06  0.662555\n   7 │ 2017-01-07  0.586022\n   8 │ 2017-01-08  0.0521332\n   9 │ 2017-01-09  0.26864\n  10 │ 2017-01-10  0.108871\n\njulia> ts = TS(df, :dates)\n(10 x 1) TS with Date Index\n\n Index       x1\n Date        Float64\n───────────────────────\n 2017-01-01  0.768448\n 2017-01-02  0.940515\n 2017-01-03  0.673959\n 2017-01-04  0.395453\n 2017-01-05  0.313244\n 2017-01-06  0.662555\n 2017-01-07  0.586022\n 2017-01-08  0.0521332\n 2017-01-09  0.26864\n 2017-01-10  0.108871\n\n\njulia> ts = TS(DataFrame(x1=random(10)), dates);\n\n\njulia> ts = TS(random(10))\n(10 x 1) TS with Int64 Index\n\n Index  x1\n Int64  Float64\n──────────────────\n     1  0.768448\n     2  0.940515\n     3  0.673959\n     4  0.395453\n     5  0.313244\n     6  0.662555\n     7  0.586022\n     8  0.0521332\n     9  0.26864\n    10  0.108871\n\njulia> ts = TS(random(10), dates);\n\n\njulia> ts = TS([random(10) random(10)], dates) # matrix object\n(10 x 2) TS with Date Index\n\n Index       x1         x2\n Date        Float64    Float64\n──────────────────────────────────\n 2017-01-01  0.768448   0.768448\n 2017-01-02  0.940515   0.940515\n 2017-01-03  0.673959   0.673959\n 2017-01-04  0.395453   0.395453\n 2017-01-05  0.313244   0.313244\n 2017-01-06  0.662555   0.662555\n 2017-01-07  0.586022   0.586022\n 2017-01-08  0.0521332  0.0521332\n 2017-01-09  0.26864    0.26864\n 2017-01-10  0.108871   0.108871\n\n\n\n\n\n\n","category":"type"},{"location":"#Base.getindex-Tuple{TS, Int64}","page":"Home","title":"Base.getindex","text":"Subsetting/Indexing\n\nTS can be subset using row and column indices. The row selector could be an integer, a range, an array or it could also be a Date object or an ISO-formatted date string (\"2007-04-10\"). There are methods to subset on year, year-month, and year-quarter. The latter two subset coredata by matching on the index column.\n\nColumn selector could be an integer or any other selector which DataFrame indexing supports. You can use a Symbols to fetch specific columns (ex: ts[:x1], ts[[:x1, :x2]]). For fetching column values as Vector or Matrix, use Colon: ts[:, :x1] and ts[:, [:x1, :x2]].\n\nFor fetching the index column vector use the index() method.\n\nExamples\n\njulia> using Random;\n\njulia> random(x) = rand(MersenneTwister(123), x);\n\njulia> ts = TS([random(10) random(10) random(10)])\njulia> show(ts)\n\n# first row\njulia> ts[1]\n(1 x 3) TS with Int64 Index\n\n Index  x1        x2        x3\n Int64  Float64   Float64   Float64\n─────────────────────────────────────\n     1  0.768448  0.768448  0.768448\n\n# first five rows\njulia> ts[1:5]\n(5 x 3) TS with Int64 Index\n\n Index  x1        x2        x3\n Int64  Float64   Float64   Float64\n─────────────────────────────────────\n     1  0.768448  0.768448  0.768448\n     2  0.940515  0.940515  0.940515\n     3  0.673959  0.673959  0.673959\n     4  0.395453  0.395453  0.395453\n     5  0.313244  0.313244  0.313244\n\n# first five rows, second column\njulia> ts[1:5, 2]\n(5 x 1) TS with Int64 Index\n\n Index  x2\n Int64  Float64\n─────────────────\n     1  0.768448\n     2  0.940515\n     3  0.673959\n     4  0.395453\n     5  0.313244\n\n\njulia> ts[1:5, 2:3]\n(5 x 2) TS with Int64 Index\n\n Index  x2        x3\n Int64  Float64   Float64\n───────────────────────────\n     1  0.768448  0.768448\n     2  0.940515  0.940515\n     3  0.673959  0.673959\n     4  0.395453  0.395453\n     5  0.313244  0.313244\n\n# individual rows\njulia> ts[[1, 9]]\n(2 x 3) TS with Int64 Index\n\n Index  x1        x2        x3\n Int64  Float64   Float64   Float64\n─────────────────────────────────────\n     1  0.768448  0.768448  0.768448\n     9  0.26864   0.26864   0.26864\n\njulia> ts[:, :x1]            # returns a Vector\n10-element Vector{Float64}:\n 0.7684476751965699\n 0.940515000715187\n 0.6739586945680673\n 0.3954531123351086\n 0.3132439558075186\n 0.6625548164736534\n 0.5860221243068029\n 0.05213316316865657\n 0.26863956854495097\n 0.10887074134844155\n\n\njulia> ts[:, [:x1, :x2]]\n(10 x 2) TS with Int64 Index\n\n Index  x1         x2\n Int64  Float64    Float64\n─────────────────────────────\n     1  0.768448   0.768448\n     2  0.940515   0.940515\n     3  0.673959   0.673959\n     4  0.395453   0.395453\n     5  0.313244   0.313244\n     6  0.662555   0.662555\n     7  0.586022   0.586022\n     8  0.0521332  0.0521332\n     9  0.26864    0.26864\n    10  0.108871   0.108871\n\n\njulia> dates = collect(Date(2007):Day(1):Date(2008, 2, 22));\njulia> ts = TS(random(length(dates)), dates)\njulia> show(ts[1:10])\n(10 x 1) TS with Date Index\n\n Index       x1        \n Date        Float64   \n───────────────────────\n 2007-01-01  0.768448\n 2007-01-02  0.940515\n 2007-01-03  0.673959\n 2007-01-04  0.395453\n 2007-01-05  0.313244\n 2007-01-06  0.662555\n 2007-01-07  0.586022\n 2007-01-08  0.0521332\n 2007-01-09  0.26864\n 2007-01-10  0.108871\n\njulia> ts[Date(2007, 01, 01)]\n(1 x 1) TS with Dates.Date Index\n\n Index       x1\n Date        Float64\n──────────────────────\n 2007-01-01  0.768448\n\n\njulia> ts[Date(2007)]\n(1 x 1) TS with Dates.Date Index\n\n Index       x1\n Date        Float64\n──────────────────────\n 2007-01-01  0.768448\n\n\njulia> ts[Year(2007)]\n(365 x 1) TS with Dates.Date Index\n\n Index       x1\n Date        Float64\n───────────────────────\n 2007-01-01  0.768448\n 2007-01-02  0.940515\n 2007-01-03  0.673959\n 2007-01-04  0.395453\n 2007-01-05  0.313244\n 2007-01-06  0.662555\n 2007-01-07  0.586022\n 2007-01-08  0.0521332\n     ⋮           ⋮\n 2007-12-24  0.468421\n 2007-12-25  0.0246652\n 2007-12-26  0.171042\n 2007-12-27  0.227369\n 2007-12-28  0.695758\n 2007-12-29  0.417124\n 2007-12-30  0.603757\n 2007-12-31  0.346659\n       349 rows omitted\n\n\njulia> ts[Year(2007), Month(11)]\n(30 x 1) TS with Date Index\n\n Index       x1        \n Date        Float64   \n───────────────────────\n 2007-11-01  0.214132\n 2007-11-02  0.672281\n 2007-11-03  0.373938\n 2007-11-04  0.317985\n 2007-11-05  0.110226\n 2007-11-06  0.797408\n 2007-11-07  0.095699\n 2007-11-08  0.186565\n 2007-11-09  0.586859\n 2007-11-10  0.623613\n 2007-11-11  0.62035\n 2007-11-12  0.830895\n 2007-11-13  0.72423\n 2007-11-14  0.493046\n 2007-11-15  0.767975\n 2007-11-16  0.462157\n 2007-11-17  0.779754\n 2007-11-18  0.398596\n 2007-11-19  0.941196\n 2007-11-20  0.578657\n 2007-11-21  0.702451\n 2007-11-22  0.746427\n 2007-11-23  0.301046\n 2007-11-24  0.619772\n 2007-11-25  0.425161\n 2007-11-26  0.410939\n 2007-11-27  0.0883656\n 2007-11-28  0.135477\n 2007-11-29  0.693611\n 2007-11-30  0.557009\n\n\njulia> ts[Year(2007), Quarter(2)];\n\n\njulia> ts[\"2007-01-01\"]\n(1 x 1) TS with Date Index\n\n Index       x1       \n Date        Float64  \n──────────────────────\n 2007-01-01  0.768448\n\n\njulia> ts[1, :x1]\n(1 x 1) TS with Dates.Date Index\n\n Index       x1\n Date        Float64\n──────────────────────\n 2007-01-01  0.768448\n\n\njulia> ts[1, \"x1\"]\n(1 x 1) TS with Date Index\n\n Index       x1       \n Date        Float64  \n──────────────────────\n 2007-01-01  0.768448\n\n\n\n\n\n\n\n","category":"method"},{"location":"#Base.join-Tuple{TS, TS}","page":"Home","title":"Base.join","text":"Joins/Column-binding\n\nTS objects can be combined together column-wise using Index as the column key. There are four kinds of column-binding operations possible as of now. Each join operation works by performing a Set operation on the Index column and then merging the datasets based on the output from the Set operation. Each operation changes column names in the final object automatically if the operation encounters duplicate column names amongst the TS objects.\n\nThe following join types are supported:\n\njoin(ts1::TS, ts2::TS, ::Type{JoinBoth})\n\na.k.a. inner join, takes the intersection of the indexes of ts1 and ts2, and then merges the columns of both the objects. The resulting object will only contain rows which are present in both the objects' indexes. The function will rename columns in the final object if they had same names in the TS objects.\n\njoin(ts1::TS, ts2::TS, ::Type{JoinAll}):\n\na.k.a. outer join, takes the union of the indexes of ts1 and ts2 before merging the other columns of input objects. The output will contain rows which are present in all the input objects while inserting missing values where a row was not present in any of the objects. This is the default behaviour if no JoinType object is provided.\n\njoin(ts1::TS, ts2::TS, ::Type{JoinLeft}):\n\nLeft join takes the index values which are present in the left object ts1 and finds matching index values in the right object ts2. The resulting object includes all the rows from the left object, the column values from the left object, and the values associated with matching index rows on the right. The operation inserts missing values where in the unmatched rows of the right object.\n\njoin(ts1::TS, ts2::TS, ::Type{JoinRight})\n\nRight join, similar to left join but works in the opposite direction. The final object contains all the rows from the right object while inserting missing values in rows missing from the left object.\n\nThe default behaviour is to assume JoinAll if no JoinType object is provided to the join method.\n\ncbind is an alias for join method.\n\nExamples\n\njulia> using Random;\n\njulia> random(x) = rand(MersenneTwister(123), x);\n\njulia> ts1 = TS(random(10), 1:10)\n\n\njulia> ts2 = TS(random(10), 1:10)\n\n\njulia> join(ts1, ts2, JoinAll)\n\n\njulia> join(ts1, ts2);\n\n\njulia> join(ts1, ts2, JoinBoth);\n\n\njulia> join(ts1, ts2, JoinLeft);\n\n\njulia> join(ts1, ts2, JoinRight);\n\n\njulia> dates = collect(Date(2017,1,1):Day(1):Date(2017,1,10));\n\njulia> ts1 = TS(random(length(dates)), dates)\njulia> show(ts1)\n(10 x 1) TS with Dates.Date Index\n\n Index       x1\n Date        Float64\n───────────────────────\n 2017-01-01  0.768448\n 2017-01-02  0.940515\n 2017-01-03  0.673959\n 2017-01-04  0.395453\n 2017-01-05  0.313244\n 2017-01-06  0.662555\n 2017-01-07  0.586022\n 2017-01-08  0.0521332\n 2017-01-09  0.26864\n 2017-01-10  0.108871\n\njulia> dates = collect(Date(2017,1,1):Day(1):Date(2017,1,30));\n\njulia> ts2 = TS(random(length(dates)), dates);\njulia> show(ts2)\n(10 x 1) TS with Int64 Index\n\n Index  x1\n Int64  Float64\n──────────────────\n     1  0.768448\n     2  0.940515\n     3  0.673959\n     4  0.395453\n     5  0.313244\n     6  0.662555\n     7  0.586022\n     8  0.0521332\n     9  0.26864\n    10  0.108871\n(10 x 1) TS with Int64 Index\n\n Index  x1\n Int64  Float64\n──────────────────\n     1  0.768448\n     2  0.940515\n     3  0.673959\n     4  0.395453\n     5  0.313244\n     6  0.662555\n     7  0.586022\n     8  0.0521332\n     9  0.26864\n    10  0.108871\n(30 x 1) TS with Dates.Date Index\n\n Index       x1\n Date        Float64\n───────────────────────\n 2017-01-01  0.768448\n 2017-01-02  0.940515\n 2017-01-03  0.673959\n 2017-01-04  0.395453\n 2017-01-05  0.313244\n 2017-01-06  0.662555\n 2017-01-07  0.586022\n 2017-01-08  0.0521332\n     ⋮           ⋮\n 2017-01-23  0.281066\n 2017-01-24  0.792931\n 2017-01-25  0.20923\n 2017-01-26  0.918165\n 2017-01-27  0.614255\n 2017-01-28  0.802665\n 2017-01-29  0.555668\n 2017-01-30  0.940782\n        14 rows omitted\n\n\n# calls `JoinAll` method\njulia> join(ts1, ts2);\n# alias\njulia> cbind(ts1, ts2);\n\n\n\n\n\n","category":"method"},{"location":"#Base.log-Tuple{TS}","page":"Home","title":"Base.log","text":"Log Function\n\nlog(ts::TS, complex::Bool = false)\n\nThis method computes the log value of non-index columns in the TS object.\n\nExamples\n\njulia> using Random\njulia> random(x) = rand(MersenneTwister(123), x...);\njulia> ts = TS(random(([1, 2, 3, 4, missing], 10)))\njulia> show(ts)\n(10 x 1) TS with Int64 Index\n\n Index  x1\n Int64  Int64?\n────────────────\n     1  missing\n     2        2\n     3        2\n     4        3\n     5        4\n     6        3\n     7        3\n     8  missing\n     9        2\n    10        3\n\njulia> log(ts)\n(10 x 1) TS with Int64 Index\n\n Index  x1_log\n Int64  Float64?\n───────────────────────\n     1  missing\n     2        0.693147\n     3        0.693147\n     4        1.09861\n     5        1.38629\n     6        1.09861\n     7        1.09861\n     8  missing\n     9        0.693147\n    10        1.09861\n\n\n\n\n\n\n","category":"method"},{"location":"#Base.names-Tuple{TS}","page":"Home","title":"Base.names","text":"Column names\n\nnames(ts::TS)\n\nReturn a Vector{String} containing column names of the TS object, excludes index.\n\nExamples\n\njulia> names(TS([1:10 11:20]))\n2-element Vector{String}:\n \"x1\"\n \"x2\"\n\n\n\n\n\n","category":"method"},{"location":"#Base.size-Tuple{TS}","page":"Home","title":"Base.size","text":"Size methods\n\nsize(ts::TS)\n\nReturn the number of rows and columns of ts as a tuple.\n\nExamples\n\njulia> TSx.size(TS([collect(1:100) collect(1:100) collect(1:100)]))\n(100, 3)\n\n\n\n\n\n","category":"method"},{"location":"#Base.vcat-Tuple{TS, TS}","page":"Home","title":"Base.vcat","text":"Row-merging (vcat/rbind)\n\nvcat(ts1::TS, ts2::TS; colmerge::Symbol=:union)\n\nConcatenate rows of two TS objects, append ts2 to ts1.\n\nThe colmerge keyword argument specifies the column merge strategy. The value of colmerge is directly passed to cols argument of DataFrames.vcat.\n\nCurrently, DataFrames.vcat supports four types of column-merge strategies:\n\n:setequal: only merge if both objects have same column names, use the order of columns in ts1.\n:orderequal: only merge if both objects have same column names and columns are in the same order.\n:intersect: only merge the columns which are common to both objects, ignore the rest.\n:union: merge even if columns differ, the resulting object has all the columns filled with missing, if necessary.\n\nExamples\n\njulia> using Random;\n\njulia> random(x) = rand(MersenneTwister(123), x);\n\njulia> dates1 = collect(Date(2017,1,1):Day(1):Date(2017,1,10));\n\njulia> dates2 = collect(Date(2017,1,11):Day(1):Date(2017,1,30));\n\njulia> ts1 = TS([randn(length(dates1)) randn(length(dates1))], dates1)\njulia> show(ts1)\n(10 x 1) TS with Dates.Date Index\n\n Index       x1\n Date        Float64\n────────────────────────\n 2017-01-01  -0.420348\n 2017-01-02   0.109363\n 2017-01-03  -0.0702014\n 2017-01-04   0.165618\n 2017-01-05  -0.0556799\n 2017-01-06  -0.147801\n 2017-01-07  -2.50723\n 2017-01-08  -0.099783\n 2017-01-09   0.177526\n 2017-01-10  -1.08461\n\njulia> df = DataFrame(x1 = randn(length(dates2)), y1 = randn(length(dates2)))\njulia> ts2 = TS(df, dates2)\njulia> show(ts2)\n(20 x 1) TS with Dates.Date Index\n\n Index       x1\n Date        Float64\n────────────────────────\n 2017-01-11   2.15087\n 2017-01-12   0.9203\n 2017-01-13  -0.0879142\n 2017-01-14  -0.930109\n 2017-01-15   0.061117\n 2017-01-16   0.0434627\n 2017-01-17   0.0834733\n 2017-01-18  -1.52281\n     ⋮           ⋮\n 2017-01-23  -0.756143\n 2017-01-24   0.491623\n 2017-01-25   0.549672\n 2017-01-26   0.570689\n 2017-01-27  -0.380011\n 2017-01-28  -2.09965\n 2017-01-29   1.37289\n 2017-01-30  -0.462384\n          4 rows omitted\n\n\njulia> vcat(ts1, ts2)\n(30 x 3) TS with Date Index\n\n Index       x1          x2              y1\n Date        Float64     Float64?        Float64?\n─────────────────────────────────────────────────────────\n 2017-01-01  -0.524798        -1.4949    missing\n 2017-01-02  -0.719611        -1.1278    missing\n 2017-01-03   0.0926092        1.19778   missing\n 2017-01-04   0.236237         1.39115   missing\n 2017-01-05   0.369588         1.21792   missing\n 2017-01-06   1.65287         -0.930058  missing\n 2017-01-07   0.761301         0.23794   missing\n 2017-01-08  -0.571046        -0.480486  missing\n 2017-01-09  -2.01905         -0.46391   missing\n 2017-01-10   0.193942        -1.01471   missing\n 2017-01-11   0.239041   missing              -0.473429\n 2017-01-12   0.286036   missing              -0.90377\n 2017-01-13   0.683429   missing              -0.128489\n 2017-01-14  -1.51442    missing              -2.39843\n 2017-01-15  -0.581341   missing              -0.12265\n 2017-01-16   1.07059    missing              -0.916064\n 2017-01-17   0.859396   missing               0.0162969\n 2017-01-18  -1.93127    missing               2.11127\n 2017-01-19   0.529477   missing               0.636964\n 2017-01-20   0.817429   missing              -0.34038\n 2017-01-21  -0.682296   missing              -0.971262\n 2017-01-22   1.36232    missing              -0.236323\n 2017-01-23   0.143188   missing              -0.501722\n 2017-01-24   0.621845   missing              -1.20016\n 2017-01-25   0.076199   missing              -1.36616\n 2017-01-26   0.379672   missing              -0.555395\n 2017-01-27   0.494473   missing               1.05389\n 2017-01-28   0.278259   missing              -0.358983\n 2017-01-29   0.0231765  missing               0.712526\n 2017-01-30   0.516704   missing               0.216855\n\njulia> vcat(ts1, ts2; colmerge=:intersect)\n(30 x 1) TS with Date Index\n\n Index       x1\n Date        Float64\n────────────────────────\n 2017-01-01  -0.524798\n 2017-01-02  -0.719611\n 2017-01-03   0.0926092\n 2017-01-04   0.236237\n 2017-01-05   0.369588\n 2017-01-06   1.65287\n 2017-01-07   0.761301\n 2017-01-08  -0.571046\n 2017-01-09  -2.01905\n 2017-01-10   0.193942\n 2017-01-11   0.239041\n 2017-01-12   0.286036\n 2017-01-13   0.683429\n 2017-01-14  -1.51442\n 2017-01-15  -0.581341\n 2017-01-16   1.07059\n 2017-01-17   0.859396\n 2017-01-18  -1.93127\n 2017-01-19   0.529477\n 2017-01-20   0.817429\n 2017-01-21  -0.682296\n 2017-01-22   1.36232\n 2017-01-23   0.143188\n 2017-01-24   0.621845\n 2017-01-25   0.076199\n 2017-01-26   0.379672\n 2017-01-27   0.494473\n 2017-01-28   0.278259\n 2017-01-29   0.0231765\n 2017-01-30   0.516704\n\n\n\n\n\n\n","category":"method"},{"location":"#RecipesBase.apply_recipe","page":"Home","title":"RecipesBase.apply_recipe","text":"Plotting\n\nplot(ts::TS, cols::Vector{Int} = collect(1:TSx.ncol(ts)))\nplot(ts::TS, cols::Vector{T}) where {T<:Union{String, Symbol}}\nplot(ts::TS, cols::T) where {T<:Union{Int, String, Symbol}}\n\nPlots a TS object with the index on the x-axis and selected cols on the y-axis. By default, plot all the columns. Columns can be selected using Int indexes, String(s), or Symbol(s).\n\nExample\n\njulia> using Random;\njulia> random(x) = rand(MersenneTwister(123), x);\njulia> dates = Date(\"2022-01-01\"):Month(1):Date(\"2022-01-01\")+Month(11);\n\njulia> df = DataFrame(Index = dates,\n        val1 = random(12),\n        val2 = random(12),\n        val3 = random(12));\n\njulia> ts = TS(df)\njulia> show(ts)\n(12 x 3) TS with Dates.Date Index\n\n Index       val1        val2        val3\n Date        Float64     Float64     Float64\n────────────────────────────────────────────────\n 2022-01-01  -0.319954    0.974594   -0.552977\n 2022-02-01  -0.0386735  -0.171675    0.779539\n 2022-03-01   1.67678    -1.75251     0.820462\n 2022-04-01   1.69702    -0.0130037   1.0507\n 2022-05-01   0.992128    0.76957    -1.28008\n 2022-06-01  -0.315461   -0.543976   -0.117256\n 2022-07-01  -1.18952    -1.12867    -0.0829082\n 2022-08-01   0.159595    0.450044   -0.231828\n 2022-09-01   0.501436    0.265327   -0.948532\n 2022-10-01  -2.10516    -1.11489     0.285194\n 2022-11-01  -0.781082   -1.20202    -0.639953\n 2022-12-01  -0.169184    1.34879     1.33361\n\n\njulia> using Plots\n\njulia> # plot(ts)\n\n# plot first 6 rows with selected columns\njulia> # plot(ts[1:6], [:val1, :val3]);\n\n# plot columns 1 and 2 on a specified window size\njulia> # plot(ts, [1, 2], size=(600, 400));\n\n\n\n\n\n","category":"function"},{"location":"#TSx.apply-Union{Tuple{V}, Tuple{T}, Tuple{TS, Union{Type{T}, T}, V}, Tuple{TS, Union{Type{T}, T}, V, Function}} where {T<:Union{Dates.DatePeriod, Dates.TimePeriod}, V<:Function}","page":"Home","title":"TSx.apply","text":"Apply/Period conversion\n\napply(ts::TS,\n      period::Union{T,Type{T}},\n      fun::V,\n      index_at::Function=first)\n     where {\n           T <: Union{DatePeriod,TimePeriod},\n           V <: Function\n           }\n\nApply fun to ts object based on period and return correctly indexed rows. This method is used for doing aggregation over a time period or to convert ts into an object of lower frequency (ex. from daily series to monthly).\n\nperiod is any of Period types in the Dates module. Conversion from lower to a higher frequency will throw an error as interpolation isn't currently handled by this method.\n\nBy default, the method uses the first value of the index within the period to index the resulting aggregated object. This behaviour can be controlled by index_at argument which can take first or last as an input.\n\nExamples\n\njulia> using Random, Statistics;\njulia> random(x) = rand(MersenneTwister(123), x);\njulia> dates = collect(Date(2017,1,1):Day(1):Date(2018,3,10));\n\njulia> ts = TS(random(length(dates)), dates)\njulia> show(ts[1:10])\n(10 x 1) TS with Date Index\n\n Index       x1\n Date        Float64\n───────────────────────\n 2017-01-01  0.768448\n 2017-01-02  0.940515\n 2017-01-03  0.673959\n 2017-01-04  0.395453\n 2017-01-05  0.313244\n 2017-01-06  0.662555\n 2017-01-07  0.586022\n 2017-01-08  0.0521332\n 2017-01-09  0.26864\n 2017-01-10  0.108871\n\njulia> apply(ts, Month, first)\n(15 x 1) TS with Date Index\n\n Index       x1_first\n Date        Float64\n───────────────────────\n 2017-01-01  0.768448\n 2017-02-01  0.790201\n 2017-03-01  0.467219\n 2017-04-01  0.783473\n 2017-05-01  0.651354\n 2017-06-01  0.373346\n 2017-07-01  0.83296\n 2017-08-01  0.132716\n 2017-09-01  0.27899\n 2017-10-01  0.995414\n 2017-11-01  0.214132\n 2017-12-01  0.832917\n 2018-01-01  0.0409471\n 2018-02-01  0.720163\n 2018-03-01  0.87459\n\n# alternate months\njulia> apply(ts, Month(2), first)\n(8 x 1) TS with Date Index\n\n Index       x1_first\n Date        Float64\n───────────────────────\n 2017-01-01  0.768448\n 2017-03-01  0.467219\n 2017-05-01  0.651354\n 2017-07-01  0.83296\n 2017-09-01  0.27899\n 2017-11-01  0.214132\n 2018-01-01  0.0409471\n 2018-03-01  0.87459\n\n\njulia> ts_weekly = apply(ts, Week, Statistics.std) # weekly standard deviation\njulia> show(ts_weekly[1:10])\n(10 x 1) TS with Date Index\n\n Index       x1_std\n Date        Float64\n────────────────────────\n 2017-01-01  NaN\n 2017-01-02    0.28935\n 2017-01-09    0.270842\n 2017-01-16    0.170197\n 2017-01-23    0.269573\n 2017-01-30    0.326687\n 2017-02-06    0.279935\n 2017-02-13    0.319216\n 2017-02-20    0.272058\n 2017-02-27    0.23651\n\n\njulia> ts_weekly = apply(ts, Week, Statistics.std, last) # indexed by last date of the week\njulia> show(ts_weekly[1:10])\n(10 x 1) TS with Date Index\n\n Index       x1_std\n Date        Float64\n────────────────────────\n 2017-01-01  NaN\n 2017-01-08    0.28935\n 2017-01-15    0.270842\n 2017-01-22    0.170197\n 2017-01-29    0.269573\n 2017-02-05    0.326687\n 2017-02-12    0.279935\n 2017-02-19    0.319216\n 2017-02-26    0.272058\n 2017-03-05    0.23651\n\n\n\n\n\n\n","category":"method"},{"location":"#TSx.describe-Tuple{IO, TS}","page":"Home","title":"TSx.describe","text":"Summary statistics\n\ndescribe(ts::TS)\n\nCompute summary statistics of ts. The output is a DataFrame containing standard statistics along with number of missing values and data types of columns.\n\nExamples\n\njulia> using Random;\njulia> random(x) = rand(MersenneTwister(123), x..);\njulia> ts = TS(random(([1, 2, 3, 4, missing], 10)))\njulia> describe(ts)\n\n\n\n\n\n","category":"method"},{"location":"#TSx.index-Tuple{TS}","page":"Home","title":"TSx.index","text":"Index column\n\nindex(ts::TS)\n\nReturn the index vector from the coredata DataFrame.\n\nExamples\n\njulia> using Random;\n\njulia> random(x) = rand(MersenneTwister(123), x);\n\njulia> ts = TS(random(10), Date(\"2022-02-01\"):Month(1):Date(\"2022-02-01\")+Month(9));\n\n\njulia> show(ts)\n(10 x 1) TS with Dates.Date Index\n\n Index       x1\n Date        Float64\n───────────────────────\n 2022-02-01  0.768448\n 2022-03-01  0.940515\n 2022-04-01  0.673959\n 2022-05-01  0.395453\n 2022-06-01  0.313244\n 2022-07-01  0.662555\n 2022-08-01  0.586022\n 2022-09-01  0.0521332\n 2022-10-01  0.26864\n 2022-11-01  0.108871\n\njulia> index(ts)\n10-element Vector{Date}:\n 2022-02-01\n 2022-03-01\n 2022-04-01\n 2022-05-01\n 2022-06-01\n 2022-07-01\n 2022-08-01\n 2022-09-01\n 2022-10-01\n 2022-11-01\n\njulia>  eltype(index(ts))\nDate\n\n\n\n\n\n","category":"method"},{"location":"#TSx.lag","page":"Home","title":"TSx.lag","text":"Lagging\n\nlag(ts::TS, lag_value::Int = 1)\n\nLag the ts object by the specified lag_value. The rows corresponding to lagged values will be rendered as missing. Negative values of lag are also accepted (see TSx.lead).\n\nExamples\n\njulia> using Random, Statistics;\n\njulia> random(x) = rand(MersenneTwister(123), x);\n\njulia> dates = collect(Date(2017,1,1):Day(1):Date(2017,1,10));\n\njulia> ts = TS(random(length(dates)), dates);\njulia> show(ts)\n(10 x 1) TS with Dates.Date Index\n\n Index       x1\n Date        Float64\n───────────────────────\n 2017-01-01  0.768448\n 2017-01-02  0.940515\n 2017-01-03  0.673959\n 2017-01-04  0.395453\n 2017-01-05  0.313244\n 2017-01-06  0.662555\n 2017-01-07  0.586022\n 2017-01-08  0.0521332\n 2017-01-09  0.26864\n 2017-01-10  0.108871\n\n\njulia> lag(ts)\n(10 x 1) TS with Date Index\n\n Index       x1\n Date        Float64?\n─────────────────────────────\n 2017-01-01  missing\n 2017-01-02        0.768448\n 2017-01-03        0.940515\n 2017-01-04        0.673959\n 2017-01-05        0.395453\n 2017-01-06        0.313244\n 2017-01-07        0.662555\n 2017-01-08        0.586022\n 2017-01-09        0.0521332\n 2017-01-10        0.26864\n\njulia> lag(ts, 2) # lags by 2 values\n(10 x 1) TS with Date Index\n\n Index       x1\n Date        Float64?\n─────────────────────────────\n 2017-01-01  missing\n 2017-01-02  missing\n 2017-01-03        0.768448\n 2017-01-04        0.940515\n 2017-01-05        0.673959\n 2017-01-06        0.395453\n 2017-01-07        0.313244\n 2017-01-08        0.662555\n 2017-01-09        0.586022\n 2017-01-10        0.0521332\n\n\n\n\n\n\n","category":"function"},{"location":"#TSx.lead","page":"Home","title":"TSx.lead","text":"Leading\n\nlead(ts::TS, lead_value::Int = 1)\n\nSimilar to lag, this method leads the ts object by lead_value. The lead rows are inserted with missing. Negative values of lead are also accepted (see TSx.lag).\n\nExamples\n\njulia> using Random, Statistics;\n\njulia> random(x) = rand(MersenneTwister(123), x);\n\njulia> dates = collect(Date(2017,1,1):Day(1):Date(2018,3,10));\n\njulia> ts = TS(DataFrame(Index = dates, x1 = random(length(dates))))\njulia> show(ts)\n(434 x 1) TS with Dates.Date Index\n\n Index       x1\n Date        Float64\n───────────────────────\n 2017-01-01  0.768448\n 2017-01-02  0.940515\n 2017-01-03  0.673959\n 2017-01-04  0.395453\n 2017-01-05  0.313244\n 2017-01-06  0.662555\n 2017-01-07  0.586022\n 2017-01-08  0.0521332\n     ⋮           ⋮\n 2018-03-03  0.127635\n 2018-03-04  0.147813\n 2018-03-05  0.873555\n 2018-03-06  0.486486\n 2018-03-07  0.495525\n 2018-03-08  0.64075\n 2018-03-09  0.375126\n 2018-03-10  0.0338698\n       418 rows omitted\n\n\njulia> lead(ts)[1:10]        # leads once\n(10 x 1) TS with Date Index\n\n Index       x1\n Date        Float64?\n───────────────────────\n 2017-01-01  0.940515\n 2017-01-02  0.673959\n 2017-01-03  0.395453\n 2017-01-04  0.313244\n 2017-01-05  0.662555\n 2017-01-06  0.586022\n 2017-01-07  0.0521332\n 2017-01-08  0.26864\n 2017-01-09  0.108871\n 2017-01-10  0.163666\n\njulia> lead(ts, 2)[1:10]     # leads by 2 values\n(10 x 1) TS with Date Index\n\n Index       x1\n Date        Float64?\n───────────────────────\n 2017-01-01  0.673959\n 2017-01-02  0.395453\n 2017-01-03  0.313244\n 2017-01-04  0.662555\n 2017-01-05  0.586022\n 2017-01-06  0.0521332\n 2017-01-07  0.26864\n 2017-01-08  0.108871\n 2017-01-09  0.163666\n 2017-01-10  0.473017\n\n\n\n\n\n\n","category":"function"},{"location":"#TSx.ncol-Tuple{TS}","page":"Home","title":"TSx.ncol","text":"Size methods\n\nncol(ts::TS)\n\nReturn the number of columns of ts. nc is an alias for ncol.\n\nExamples\n\njulia> using Random;\n\njulia> random(x) = rand(MersenneTwister(123), x);\n\njulia> TSx.ncol(TS([random(100) random(100) random(100)]))\n3\n\njulia> nc(TS([random(100) random(100) random(100)]))\n3\n\n\n\n\n\n","category":"method"},{"location":"#TSx.nrow-Tuple{TS}","page":"Home","title":"TSx.nrow","text":"Size methods\n\nnrow(ts::TS)\nnr(ts::TS)\n\nReturn the number of rows of ts. nr is an alias for nrow.\n\nExamples\n\njulia> ts = TS(collect(1:10))\n\n\njulia> TSx.nrow(ts)\n10\n\n\n\n\n\n","category":"method"},{"location":"#TSx.rollapply-Tuple{Function, TS, Any, Int64}","page":"Home","title":"TSx.rollapply","text":"Rolling Functions\n\nrollapply(fun::Function, ts::TS, column::Any, windowsize::Int)\n\nApply a function to a column of ts for each continuous set of rows of size windowsize. column could be any of the DataFrame column selectors.\n\nThe output is a TS object with (nrow(ts) - windowsize + 1) rows indexed with the last index value of each window.\n\nThis method uses RollingFunctions package to implement this functionality.\n\nExamples\n\njulia> ts = TS(1:12, Date(\"2022-02-01\"):Month(1):Date(\"2022-02-01\")+Month(11))\n\njulia> show(ts)\n(12 x 1) TS with Dates.Date Index\n\n Index       x1\n Date        Int64\n───────────────────\n 2022-02-01      1\n 2022-03-01      2\n 2022-04-01      3\n 2022-05-01      4\n 2022-06-01      5\n 2022-07-01      6\n 2022-08-01      7\n 2022-09-01      8\n 2022-10-01      9\n 2022-11-01     10\n 2022-12-01     11\n 2023-01-01     12\n\njulia> rollapply(sum, ts, :x1, 10)\n(3 x 1) TS with Dates.Date Index\n\n Index       x1_rolling_sum\n Date        Float64\n────────────────────────────\n 2022-11-01            55.0\n 2022-12-01            65.0\n 2023-01-01            75.0\n\njulia> rollapply(Statistics.mean, ts, 1, 5)\n(8 x 1) TS with Dates.Date Index\n\n Index       x1_rolling_mean\n Date        Float64\n─────────────────────────────\n 2022-06-01              3.0\n 2022-07-01              4.0\n 2022-08-01              5.0\n 2022-09-01              6.0\n 2022-10-01              7.0\n 2022-11-01              8.0\n 2022-12-01              9.0\n 2023-01-01             10.0\n\n\n\n\n\n\n","category":"method"}]
}
