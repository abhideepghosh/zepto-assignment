{ pkgs, ... }: {
  channel = "stable-23.11"; # "stable-23.11" or "unstable"
  packages = [
    pkgs.nodejs
    pkgs.nodePackages.firebase-tools
  ];
  idx.extensions = [
    "svelte.svelte-vscode"
    "vue.volar"
  ];
  idx.previews = {
    enable = true;
    previews = [
      {
        command = ["npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0"];
        manager = "web";
        id = "web";
      }
      {
        id = "ios";
        manager = "ios";
      }
    ];
  };
}