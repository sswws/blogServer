const { result, ERRORCODE, throwError } = require("../../result/index");
const errorCode = ERRORCODE.LINKS;

const { addOrUpdateLinks, deleteLinks, approveLinks, getLinksList } = require("../../service/links/index");

class LinksController {
  /**
   * 新增/修改友链
   */
  async addOrUpdateLinks(ctx) {
    try {
      const { id } = ctx.request.body;
      const res = await addOrUpdateLinks(ctx.request.body);
      const msg = id ? "修改" : "发布";
      ctx.body = result(msg + "友链成功", res);
    } catch (err) {
      console.error(err);
      return ctx.app.emit("error", throwError(errorCode, msg + "友链失败"), ctx);
    }
  }

  /**
   * 批量删除友链
   */
  async deleteLinks(ctx) {
    try {
      const { idList } = ctx.request.body;
      const res = await deleteLinks(idList);

      ctx.body = result(" 删除友链成功", res);
    } catch (err) {
      console.error(err);
      return ctx.app.emit("error", throwError(errorCode, "删除友链失败"), ctx);
    }
  }

  // 审核友链
  async approveLinks(ctx) {
    try {
      const { idList } = ctx.request.body;
      const res = await approveLinks(idList);

      ctx.body = result("审核友链成功", res);
    } catch (err) {
      console.error(err);
      return ctx.app.emit("error", throwError(errorCode, "审核友链失败"), ctx);
    }
  }

  // 分页获取友链
  async getLinksList(ctx) {
    try {
      const { current, size, time, status, site_name } = ctx.request.body;
      const res = await getLinksList({ current, size, time, status, site_name });

      ctx.body = result("查询友链成功", res);
    } catch (err) {
      console.error(err);
      return ctx.app.emit("error", throwError(errorCode, "查询友链失败"), ctx);
    }
  }
}

module.exports = new LinksController();
