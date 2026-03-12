import { useState, useCallback } from 'react';
import { projectsApi } from '../api/projectsApi';
import { useToast } from '../context/ToastContext';

export function useProjects() {
  const [projects, setProjects]       = useState([]); // árvore
  const [projectsFlat, setProjectsFlat] = useState([]); // lista plana para seletor
  const [loading, setLoading]         = useState(false);
  const { toast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [tree, flat] = await Promise.all([
        projectsApi.getAll(),
        projectsApi.getFlat(),
      ]);
      setProjects(tree   ?? []);
      setProjectsFlat(flat ?? []);
    } catch {
      toast('Erro ao carregar projetos', 'error');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const save = useCallback(async (payload, editId) => {
    try {
      if (editId) { await projectsApi.update(editId, payload); toast('Projeto atualizado! 📁'); }
      else        { await projectsApi.create(payload);          toast('Projeto criado! 📁'); }
      await load();
      return true;
    } catch {
      toast('Erro ao salvar projeto', 'error');
      return false;
    }
  }, [load, toast]);

  const remove = useCallback(async (id) => {
    try {
      await projectsApi.remove(id);
      toast('Projeto deletado.');
      await load();
    } catch {
      toast('Erro ao deletar projeto', 'error');
    }
  }, [load, toast]);

  const reorder = useCallback(async (ids) => {
    try { await projectsApi.reorder(ids); }
    catch { toast('Erro ao salvar ordem', 'error'); }
  }, [toast]);

  return { projects, projectsFlat, loading, load, save, remove, reorder };
}
