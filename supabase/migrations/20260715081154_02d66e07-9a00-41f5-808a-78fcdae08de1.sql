
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.grant_admin_on_confirm() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;

DROP POLICY "Anyone can log a page view" ON public.page_views;
CREATE POLICY "Anyone can log a page view" ON public.page_views
  FOR INSERT TO anon, authenticated
  WITH CHECK (path IS NOT NULL AND length(path) > 0 AND length(path) < 512);
