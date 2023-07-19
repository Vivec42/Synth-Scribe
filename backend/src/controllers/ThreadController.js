const models = require("../models");

class ThreadController {
  static browseThreads = async (req, res) => {
    try {
      return await models.thread
        .findAll()
        .then(([threadsList]) => {
          res.status(200).send(threadsList);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  /*-------------------------------------------------------- */
  /*-------------------------------------------------------- */

  static findThread = async (req, res) => {
    try {
      const checkThreadExistence = await models.thread
        .find(req.params.id)
        .then((result) => result[0]);

      if (!checkThreadExistence.length) {
        return res.status(404).send("This thread doesn't exist !");
      }

      return await models.thread
        .find(req.params.id)
        .then(([threadsList]) => {
          res.status(200).send(threadsList);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  /*-------------------------------------------------------- */
  /*-------------------------------------------------------- */

  static addThread = async (req, res) => {
    const thread = req.body;

    if (!thread.title || !thread.description) {
      return res.sendStatus(400);
    }

    try {
      const titleAlreadyExist = await models.thread
        .findByTitle(thread.title)
        .then((result) => result[0]);
      if (titleAlreadyExist.length !== 0) {
        return res
          .status(403)
          .send("This title is already in use ! Choose another.");
      }

      return await models.thread
        .insertThread({ ...thread, user_id: req.userId })
        .then(([result]) => {
          return res
            .location("/threads")
            .status(201)
            .json({ ...thread, id: result.insertId });
        })
        .catch((err) => {
          console.error(err);
          return res.sendStatus(500);
        });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  /*-------------------------------------------------------- */
  /*-------------------------------------------------------- */

  static editThread = async (req, res) => {
    try {
      const checkThreadExistence = await models.thread
        .find(req.params.id)
        .then((result) => result[0]);

      if (!checkThreadExistence.length) {
        return res.status(404).send("This thread doesn't exist !");
      }

      return models.thread.updateThread(req.body).then(() => {
        res.sendStatus(204);
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  /*-------------------------------------------------------- */
  /*-------------------------------------------------------- */

  static deleteThread = async (req, res) => {
    try {
      const checkThreadExistence = await models.thread
        .find(req.params.id)
        .then((result) => result[0]);

      if (!checkThreadExistence.length) {
        return res
          .status(404)
          .send("This thread doesn't exist or is already deleted !");
      }

      return models.thread.delete(req.params.id).then(() => {
        res.sendStatus(204);
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

module.exports = ThreadController;
