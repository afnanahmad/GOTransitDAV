const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const apiRoutes = require('./routes/api-routes');
const pointRouter = require('./routes/PointRoutes');
const pointSlotRouter = require('./routes/PointSlotRoutes');
const pointSlotMergeRouter = require('./routes/PointSlotMergeRoutes');
const slotRouter = require('./routes/SlotsRoutes');
const aggregatePointsRouter = require('./routes/AggregatedPointsRoutes');
const pointSlotDayRouter = require('./routes/PointSlotsDayRoutes');
const pointFlowByDateRouter = require('./routes/PointFlowByDateRoutes');
const pointFlowBySlotRouter = require('./routes/PointFlowBySlotRoutes');
const bodyParser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/', routes);
app.use('/api', apiRoutes);
app.use('/api/point', pointRouter);
//app.use('/api/pointSlots', pointSlotRouter);
//app.use('/api/slot', pointSlotMergeRouter);
app.use('/api/slots', slotRouter);
app.use('/api/aggregate_points', aggregatePointsRouter);
app.use('/api/point_slot_day', pointSlotDayRouter);
app.use('/api/point_flow_by_date', pointFlowByDateRouter);
app.use('/api/point_flow_by_slot', pointFlowBySlotRouter);

module.exports = app;
