import React, {useContext,useEffect,useState} from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TasksContext } from "@/context/tasks.context.jsx";
import { extractQueryString } from "@/lib/extractQueryString.js";
import {useNavigate} from "react-router";

export function OrderSelect() {
  const { tasks } = useContext(TasksContext);
  const [currentOrder, setCurrentOrder] = useState();
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  const order = tasks?.pagination?.links?.next
    ? extractQueryString(tasks.pagination.links.next).get("order")
    : undefined;

  useEffect(() => {
    if (!tasks?.pagination?.links?.currentPage) return;

    const currentPage = extractQueryString(
      tasks.pagination.links.currentPage
    );

    const query = `/tasks?limit=${currentPage.get("limit")}&page=${currentPage.get("page")}`;

    setQuery(query);
  }, [tasks]);

  useEffect(() => {
    if (currentOrder && query) {
      navigate(`${query}&order=${currentOrder}`);
    } else if (currentOrder && !query) {
      navigate(`/tasks?order=${currentOrder}`);
    }
  }, [currentOrder, query]);

  return (
      <Select
        value={currentOrder ?? order ?? "asc"}
        onValueChange={(value) => setCurrentOrder(value)}
        >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Select Order" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="asc">Asc</SelectItem>
          <SelectItem value="dsc">Dsc</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}