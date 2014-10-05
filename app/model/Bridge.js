Ext.define('DEMO.model.Bridge', {
    extend: 'DEMO.model.TreeGridRow',
    fields: [
        "RouteId",
        "RouteName",
        "FromMP",
        "ToMP",
        "Length",
        "FunctionalClass",
        "NumberOfLanes",
        "Jurisdiction",
        "BridgeName",
    ]
});