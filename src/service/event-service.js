import { validate } from "../validation/validation.js";
import {
  createEventValidation,
  getEventValidation,
  searchEventValidation,
  updateEventValidation
} from "../validation/event-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (admin, request) => {
  const event = validate(createEventValidation, request);
  event.id_admin = admin.id_admin;
  return prismaClient.event.create({
    data: event,
    select: {
      id_admin: true,
      id_event: true,
      nama_event: true,
      waktu: true,
      artis: true,
    }
  });
};
const getAll = async (user) => {
  const events = await prismaClient.event.findMany({
    where: {
      id_admin: user.id_admin
    },
    select: {
      id_event: true,
      id_admin: true,
      nama_event: true,
      waktu: true,
      artis: true
    }
  });
  return events;
};
const get = async (id_admin, eventId) => {
  eventId = validate(getEventValidation, eventId);
  const event = await prismaClient.event.findFirst({
    where: {
      id_event: eventId,
      id_admin: id_admin
    },
    select: {
      id_event: true,
      id_admin: true,
      nama_event: true,
      waktu: true,
      artis: true
    }
  });


  if (!event) {
    throw new ResponseError(404, "Event not found");
  }

  return event;
};


const update = async (id_event, request) => {
  const event = validate(updateEventValidation, request);

  const totalInDatabase = await prismaClient.event.count({
    where: {
      id_event: parseInt(id_event),
    }
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "Event not found");
  }

  return prismaClient.event.update({
    where: {
      id_event: parseInt(id_event),
    },
    data: {
      nama_event: event.nama_event,
      artis: event.artis,
      waktu: event.waktu,
    },
    select: {
      id_event: true,
      nama_event: true,
      artis: true,
      waktu: true,
    }
  });
};


const remove = async (id_event, id_admin) => {
  id_event = validate(getEventValidation, id_event);
  const totalInDatabase = await prismaClient.event.count({
    where: {
      id_event: parseInt(id_event),
    }
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "Event not found");
  }

  return prismaClient.event.delete({
    where: {
      id_event: parseInt(id_event),
      AND : {
        id_admin: parseInt(id_admin)
      }
    }
  });
};

const search = async (user, request) => {
  request = validate(searchEventValidation, request);
  const skip = (request.page - 1) * request.size;

  const filters = [{ id_user: user.id_user }];

  if (request.name) {
    filters.push({
      name: {
        contains: request.name
      }
    });
  }
  if (request.location) {
    filters.push({
      location: {
        contains: request.location
      }
    });
  }

  const events = await prismaClient.event.findMany({
    where: {
      AND: filters
    },
    take: request.size,
    skip: skip,
    select: {
      id_event: true,
      name: true,
      description: true,
      date: true,
      location: true
    }
  });

  const totalItems = await prismaClient.event.count({
    where: {
      AND: filters
    }
  });

  return {
    data: events,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size)
    }
  };
};

export default {
  getAll, 
  create,
  get,
  update,
  remove,
  search
};
