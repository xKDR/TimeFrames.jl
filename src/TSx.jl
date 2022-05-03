module TSx

using DataFrames, Dates, ShiftedArrays, RecipesBase, RollingFunctions

import Base.convert
import Base.diff
import Base.filter
import Base.first
import Base.getindex
import Base.join
import Base.lastindex
import Base.length
import Base.log
import Base.names
import Base.print
import Base.==
import Base.show
import Base.summary
import Base.size
import Base.vcat

import Dates.Period

export TS,
    JoinBoth,
    JoinAll,
    JoinInner,
    JoinLeft,
    JoinOuter,
    JoinRight,
    Matrix,
    apply,
    convert,
    describe,
    diff,
    first,
    getindex,
    head,
    index,
    lag,
    lastindex,
    lead,
    length,
    names,
    first,
    head,
    tail,
    nr,
    nrow,
    nc,
    ncol,
    pctchange,
    plot,
    log,    
    show,
    size,
    subset,
    summary,
    tail,
    rollapply

include("TS.jl")
include("utils.jl")

include("apply.jl")
include("convert.jl")
include("diff.jl")
include("getindex.jl")
include("join.jl")
include("lag.jl")
include("lead.jl")
include("log.jl")
include("pctchange.jl")
include("plot.jl")
include("rollapply.jl")
include("subset.jl")
include("vcat.jl")

end                             # END module TSx
